import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CHUNK_DIR = join(process.cwd(), ".next", "static", "chunks");

const BUDGET_KB = 4200;

const KB = 1024;

const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return walk(path);
        return entry.name.endsWith(".js") ? [path] : [];
    });

const shippedKb = () =>
    Math.round(
        walk(CHUNK_DIR).reduce(
            (total, path) => total + statSync(path).size,
            0,
        ) / KB,
    );

describe("client JavaScript budget", () => {
    it.skipIf(!existsSync(CHUNK_DIR))(
        "never exceeds the budget seeded when finding 09.6 was closed",
        () => {
            expect(shippedKb()).toBeLessThanOrEqual(BUDGET_KB);
        },
    );

    it.skipIf(!existsSync(CHUNK_DIR))(
        "still produces a measurable bundle",
        () => {
            expect(shippedKb()).toBeGreaterThan(0);
        },
    );
});
