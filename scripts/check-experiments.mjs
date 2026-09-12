#!/usr/bin/env node
import {
  assertExperimentScripts,
  listExperiments,
  runExperimentScript,
} from "./experiments.mjs";

const experiments = await listExperiments();

if (experiments.length === 0) {
  console.error("No Experiment projects found under experiments/.");
  process.exit(1);
}

for (const experiment of experiments) {
  assertExperimentScripts(experiment);
  console.log(`Checking Experiment ${experiment.name} (${experiment.packageName})`);
  console.log(`  -> build`);
  await runExperimentScript(experiment, "build");
  console.log(`  -> check`);
  await runExperimentScript(experiment, "check");
}

console.log(`Checked ${experiments.length} Experiment project(s).`);
