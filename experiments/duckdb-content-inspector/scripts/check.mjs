import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const experimentRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = resolve(experimentRoot, "dist");
const fixturePath = resolve(experimentRoot, "fixtures", "local-data-store.json");

await access(resolve(distDirectory, "index.html")).catch(() => {
  throw new Error("Built experiment is missing. Run `pnpm build` before `pnpm check`.");
});
await access(fixturePath);

const { chromium } = await import("playwright");

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".wasm", "application/wasm"],
]);

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://127.0.0.1").pathname);
    const requestedFile = pathname === "/" ? "index.html" : pathname.slice(1);
    const filePath = resolve(distDirectory, requestedFile);
    const localPath = relative(distDirectory, filePath);

    if (localPath.startsWith("..") || isAbsolute(localPath)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes.get(extname(filePath)) ?? "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

await new Promise((resolveListening, rejectListening) => {
  server.once("error", rejectListening);
  server.listen(0, "127.0.0.1", resolveListening);
});

const address = server.address();
assert(address && typeof address === "object");
const origin = `http://127.0.0.1:${address.port}`;

let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  const pageErrors = [];
  const failedRequests = [];
  const externalRequests = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(`${request.url()}: ${request.failure()?.errorText ?? "failed"}`));
  page.on("request", (request) => {
    const url = new URL(request.url());
    if ((url.protocol === "http:" || url.protocol === "https:") && url.origin !== origin) {
      externalRequests.push(request.url());
    }
  });

  await page.goto(origin, { waitUntil: "domcontentloaded" });
  await page.getByRole("tab").first().waitFor();

  assert.equal(await page.locator("#launch-warning").isHidden(), true, "expected the interactive module to load");
  assert.equal(await page.getByRole("tab").count(), 4, "expected four walkthrough tabs");
  assert.equal(await page.locator("[data-step]:visible").count(), 3, "expected three visible walkthrough step buttons");

  await page.locator("#load-sample").click();
  await page.locator("#start-duckdb").click();
  await page.waitForFunction(() => document.querySelector("#status-grid .status-card:nth-child(3) small")?.textContent === "ready", null, { timeout: 60_000 });
  await page.locator("#run-query").click();
  await page.waitForFunction(() => document.querySelector("#status-grid .status-card:nth-child(4) small")?.textContent === "done", null, { timeout: 60_000 });

  const overviewRows = await page.locator("#results tbody tr").evaluateAll((rows) =>
    rows.map((row) => [...row.querySelectorAll("td")].map((cell) => cell.textContent?.trim())),
  );
  assert.deepEqual(overviewRows, [
    ["authors", "2", "2"],
    ["blog", "3", "3"],
    ["docs", "2", "2"],
  ]);

  await page.locator("#file-input").setInputFiles(fixturePath);
  await page.waitForFunction(() => document.querySelector("#status-grid .status-card:first-child strong")?.textContent === "local-data-store.json");
  assert.equal(await page.locator("#collection-list li").count(), 1, "expected the selected local store to replace the bundled sample");
  assert.deepEqual(externalRequests, [], "built experiment requested a remote runtime asset");
  assert.deepEqual(failedRequests, [], "built experiment had failed requests");
  assert.deepEqual(pageErrors, [], "built experiment raised page errors");

  console.log("Verified the built bundled-sample and local-store workflows.");
} finally {
  await browser?.close();
  await new Promise((resolveClosed, rejectClosed) => {
    server.close((error) => error ? rejectClosed(error) : resolveClosed());
  });
}
