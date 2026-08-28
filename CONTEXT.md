# Astro Data Labs

An open-source, community-driven index of executable experiments in data pipelines, architecture, and infrastructure for Astro sites. The experiments live together in a monorepository and can serve as starting points for independent projects without prescribing which approach an engineering team should adopt.

## Language

### Repository

**Experiment**:
A forkable, executable proof-of-concept that explains one data problem or opportunity for Astro sites and demonstrates one possible response.
_Avoid_: Feature, production integration, supported product

**Proof-of-concept showcase**:
An external, executable interface that communicates the feasibility and value of a content-first launch strategy, without promising a production-ready or maintained tool.
_Avoid_: Product, application, supported inspector

**Lab**:
The shared monorepository where independent experiments are proposed, compared, forked, and developed by maintainers and community contributors.
_Avoid_: Product suite, framework, canonical architecture

**Experiment index**:
The public-facing catalog through which outsiders discover, compare, and navigate the lab's executable experiments.
_Avoid_: Product catalog, unified application

**Experiment project**:
A runnable, self-contained project under the lab's experiments area. Its dependencies, fixtures, runtime, and experiment-specific support code live with it; it may explore application, package, pipeline, architecture, or infrastructure shapes, but must provide an observable demonstration rather than only reusable code.
_Avoid_: App, workspace package, production service

**Experiment contract**:
The common set of generic commands implemented by every experiment and invoked by repository-wide automation without experiment-specific knowledge.
_Avoid_: Root special case, technology-specific CI step

**Lab index**:
The GitHub Pages entry point that introduces the lab and points visitors to experiments without requiring every experiment to be deployed online.
_Avoid_: Unified application, experiment hosting requirement

**Experiment parity**:
The principle that repository navigation, commands, and documentation do not rank or privilege one experiment over another.
_Avoid_: Featured experiment, flagship experiment

**Experiment dispatcher**:
The neutral root command that selects any experiment by name and invokes its local development command without experiment-specific shortcuts.
_Avoid_: Featured shortcut, root-owned experiment runtime

**Planned experiment**:
An experiment proposal captured as an experiment request before its executable project exists.
_Avoid_: Roadmap milestone, promised release

**Shared package**:
Reusable code whose useful scope is intentionally limited to multiple projects inside the lab.
_Avoid_: Experiment, public library, package incubator

**Public package**:
Objectively reusable code extracted into its own open-source project and published for use beyond the lab.
_Avoid_: Shared package, graduated experiment

**Forkability**:
The ability to take an individual experiment as a comprehensible starting point for an independent project or dedicated library outside the lab.
_Avoid_: Forking the whole lab as a ready-made project, drop-in production readiness, backwards-compatibility guarantee

**Experiment request**:
A proposed experiment submitted as an issue or explanatory pull request that states one Astro data problem or opportunity and why the experiment is useful.
_Avoid_: Feature request, unexplained demo, miscellaneous code sample

**Feature request**:
A proposal to improve repository functionality or an existing experiment rather than to introduce a new experiment.
_Avoid_: Experiment request

**Roadmap**:
Repository or experiment improvements that have been selected for active work, represented through a GitHub Project roadmap view rather than a speculative list of ideas.
_Avoid_: Backlog, experiment request list, manual repository roadmap file

**Graduated experiment**:
An experiment that has inspired a standalone tool or public package. It preserves provenance and links to the resulting project, while remaining available for further experimentation in the lab.
_Avoid_: Promoted shared package, deleted prototype

### Experiment Status

**Exploring**:
An experiment whose question and implementation are still actively changing.

**Concluded**:
An experiment with documented observations and no currently planned investigation.

**Graduated**:
An experiment that has produced or inspired a standalone open-source project while retaining its place in the lab.

**Archived**:
An experiment retained for historical context that is no longer expected to run or receive development.

**Author thesis**:
The original author's evolving position that web projects benefit from a monorepository with Astro as the web foundation. The lab advances this position through working experiments; a future organization may articulate and steward the broader thesis.
_Avoid_: Repository policy, proven universal rule

**Research artifact**:
A preserved demonstration that suggests an approach to Astro site developers and makes its trade-off visible through direct interaction.
_Avoid_: End-user tool, production service

### DuckDB Experiment

**Content-first launch**:
An early project phase in which Astro Content Collections remain the source of truth while the data volume is small and its shape is still changing.
_Avoid_: Database replacement, database-free architecture

**SQL visibility**:
The continued ability to inspect content data using SQL while Astro Content Collections remain the source of truth.
_Avoid_: SQL persistence, database-backed editing

**Direct data view**:
A read-only view of a site's own content records that bypasses the site's presentation layer and exposes all collections in one inspectable projection.
_Avoid_: Admin panel, CMS, data editor
