# Domain docs

This repo uses a single-context domain-doc layout.

## Before exploring

Read these files when they exist:

- `CONTEXT.md` at the repo root.
- Relevant ADRs under `docs/adr/`.

If a file or directory does not exist, proceed without flagging its absence. The `domain-modeling` skill creates domain documentation when the project resolves new terms or decisions.

## File structure

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
└── src/
```

## Use the glossary's vocabulary

Use terms as defined in `CONTEXT.md` in issue titles, specifications, refactor proposals, hypotheses, and test names. Do not replace them with synonyms that the glossary explicitly rejects.

If a needed concept is missing, first check whether the project already uses another term. Record genuine vocabulary gaps for the `domain-modeling` skill.

## Flag ADR conflicts

Call out any proposed work that contradicts an existing ADR. Name the ADR and explain why the decision may need to be reopened instead of silently overriding it.
