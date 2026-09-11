# DuckDB content inspector

Status: **exploring**.

This Experiment project turns Astro content collection data into one DuckDB table for local SQL inspection. It reads an Astro-style `devalue` store or a normalized JSON row array. DuckDB-Wasm runs in a Web Worker inside the browser, and selected files never leave the tab.

## Run it

From this directory:

```sh
pnpm dev
```

From the repository root:

```sh
pnpm --filter @astro-data-labs/duckdb-content-inspector dev
```

Open <http://127.0.0.1:5173/>. Use the bundled sample or select a local `.astro/data-store.json` file.

## Build and check

```sh
pnpm build
pnpm check
```

The build writes a static deliverable to `dist/` with local JavaScript, Worker, and WASM assets. The check serves that directory, drives the bundled-sample and local-store workflows in Chromium, and fails if the page requests a remote runtime asset.

## Compatibility boundary

Astro supports content access through the `astro:content` module. This Experiment instead reads `.astro/data-store.json`, an internal generated artifact. Astro can change that representation, and experimental chunked collection storage does not use one shared JSON file.
