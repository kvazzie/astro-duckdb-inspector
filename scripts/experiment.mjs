#!/usr/bin/env node
import {
  assertExperimentScripts,
  getExperiment,
  runExperimentScript,
} from "./experiments.mjs";

const experimentName = process.argv[2];
const scriptArgs = process.argv.slice(3);

try {
  const experiment = await getExperiment(experimentName);
  assertExperimentScripts(experiment, ["dev"]);
  console.log(`Starting Experiment ${experiment.name} (${experiment.packageName})`);
  await runExperimentScript(experiment, "dev", scriptArgs);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
