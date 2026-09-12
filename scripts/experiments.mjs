import { spawn } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const experimentsDirectory = join(repositoryRoot, "experiments");
const requiredExperimentScripts = ["dev", "build", "check"];

export { repositoryRoot, experimentsDirectory, requiredExperimentScripts };

/**
 * Discover Experiment projects under experiments/* that contain a package.json.
 */
export async function listExperiments() {
  let entries;
  try {
    entries = await readdir(experimentsDirectory, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const experiments = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const directory = join(experimentsDirectory, entry.name);
    const packageJsonPath = join(directory, "package.json");

    let packageJson;
    try {
      packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        continue;
      }
      throw new Error(`Failed to read Experiment package at ${packageJsonPath}: ${error}`);
    }

    experiments.push({
      name: entry.name,
      directory,
      packageJson,
      packageName: typeof packageJson.name === "string" ? packageJson.name : entry.name,
    });
  }

  experiments.sort((left, right) => left.name.localeCompare(right.name));
  return experiments;
}

/**
 * Resolve one Experiment by directory name under experiments/.
 */
export async function getExperiment(name) {
  if (!name || typeof name !== "string") {
    throw new ExperimentLookupError(
      "Missing Experiment name. Usage: pnpm experiment <experiment-name>",
    );
  }

  if (name.includes("/") || name.includes("\\") || name === "." || name === "..") {
    throw new ExperimentLookupError(
      `Invalid Experiment name ${JSON.stringify(name)}. Use the directory name under experiments/.`,
    );
  }

  const experiments = await listExperiments();
  const experiment = experiments.find((candidate) => candidate.name === name);

  if (!experiment) {
    const available =
      experiments.length === 0
        ? "No Experiment projects were found under experiments/."
        : `Available Experiments: ${experiments.map((candidate) => candidate.name).join(", ")}`;
    throw new ExperimentLookupError(
      `Unknown Experiment ${JSON.stringify(name)}. ${available}`,
    );
  }

  return experiment;
}

/**
 * Fail when an Experiment omits one of the required contract scripts.
 */
export function assertExperimentScripts(experiment, scriptNames = requiredExperimentScripts) {
  const scripts =
    experiment.packageJson &&
    typeof experiment.packageJson === "object" &&
    experiment.packageJson.scripts &&
    typeof experiment.packageJson.scripts === "object"
      ? experiment.packageJson.scripts
      : {};

  const missing = scriptNames.filter((scriptName) => {
    const value = scripts[scriptName];
    return typeof value !== "string" || value.trim() === "";
  });

  if (missing.length > 0) {
    throw new Error(
      `Experiment ${experiment.name} is missing required script(s): ${missing.join(", ")}. ` +
        "Every Experiment project must define non-empty `dev`, `build`, and `check` commands.",
    );
  }
}

/**
 * Run a package script inside an Experiment directory through pnpm.
 */
export function runExperimentScript(experiment, scriptName, scriptArgs = []) {
  const args = ["run", scriptName, ...scriptArgs];
  return runCommand("pnpm", args, experiment.directory);
}

export function runCommand(command, args, cwd = repositoryRoot) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      env: process.env,
      shell: false,
    });

    child.on("error", rejectPromise);
    child.on("exit", (code, signal) => {
      if (signal) {
        rejectPromise(new Error(`${command} ${args.join(" ")} exited from signal ${signal}`));
        return;
      }
      if (code !== 0) {
        rejectPromise(
          new Error(`${command} ${args.join(" ")} failed in ${cwd} with exit code ${code ?? 1}`),
        );
        return;
      }
      resolvePromise();
    });
  });
}

export class ExperimentLookupError extends Error {
  constructor(message) {
    super(message);
    this.name = "ExperimentLookupError";
  }
}
