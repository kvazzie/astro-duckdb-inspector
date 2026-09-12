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
  console.log(`Building Experiment ${experiment.name} (${experiment.packageName})`);
  await runExperimentScript(experiment, "build");
}

console.log(`Built ${experiments.length} Experiment project(s).`);
