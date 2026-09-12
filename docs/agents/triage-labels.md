# Triage labels

The engineering skills use five canonical triage roles. This file maps those roles to the labels in this repo's issue tracker.

| Canonical role | Tracker label | Meaning |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | A maintainer needs to evaluate the issue |
| `needs-info` | `needs-info` | Waiting for more information from the reporter |
| `ready-for-agent` | `ready-for-agent` | Fully specified and ready for an agent |
| `ready-for-human` | `ready-for-human` | Requires human implementation |
| `wontfix` | `wontfix` | Will not be actioned |

When a skill refers to a triage role, use the corresponding tracker label from this table.

## Domain labels

These labels route Lab work. They do not replace triage labels.

| Label | Meaning |
| --- | --- |
| `experiment` | Work about proposing or changing an Experiment |
| `lab-infrastructure` | Work about repository tooling, automation, index, or contribution surfaces |
| `discussion-needed` | Needs conversation before implementation choices are locked |
| `good-first-experiment` | A small Experiment or Experiment change suitable for a new contributor |
| `graduated` | Marks an Experiment that has inspired a Public package or standalone tool |

## Roadmap selection

Experiment requests and Feature requests stay ordinary Issues after filing.
Add work to the GitHub Project Roadmap only when maintainers select it for implementation.
