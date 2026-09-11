# Domain docs

This workspace uses one shared domain context. The Lab and every Experiment use the vocabulary in the root `CONTEXT.md`.

The number of Experiment projects is unbounded. Keeping their vocabulary together gives contributors one place to learn and refine the terms used across the community.

## Before exploring

Read these files when they exist:

- `CONTEXT.md` at the repository root.
- Relevant ADRs under `docs/adr/`.

Record Lab-wide and Experiment-specific terms in the root `CONTEXT.md`. Record architectural decisions under the root `docs/adr/`.

If a file or directory does not exist, proceed without flagging its absence. The `domain-modeling` skill creates domain documentation when the project resolves new terms or decisions.

## File structure

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
├── experiments/
│   └── <experiment>/
└── packages/
    └── <shared-package>/
```

## Use the glossary's vocabulary

Use terms as defined in `CONTEXT.md` in issue titles, specifications, refactor proposals, hypotheses, and test names. Do not replace them with synonyms that the glossary explicitly rejects.

If a needed concept is missing, first check whether the project already uses another term. Record genuine vocabulary gaps through the `domain-modeling` skill.

## Flag ADR conflicts

Call out proposed work that contradicts an existing ADR. Name the ADR and explain why the decision may need to be reopened instead of silently overriding it.
