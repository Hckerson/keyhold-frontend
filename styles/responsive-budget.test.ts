import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

const RESPONSIVE_UTILITY = /(?<=[\s"'`])(?:sm|md|lg|xl|2xl):(?=[a-z[])/g;

const BUDGET = 115;

const SEALED = ["components/ui", "components/patterns"];

const ROOTS = ["app", "components"];

const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return walk(path);
        return entry.name.endsWith(".tsx") ? [path] : [];
    });

const sources = ROOTS.flatMap((root) => walk(join(process.cwd(), root)));

const asPosix = (path: string) =>
    relative(process.cwd(), path).split(sep).join("/");

const countIn = (path: string) =>
    (readFileSync(path, "utf8").match(RESPONSIVE_UTILITY) ?? []).length;

describe("inline responsive utility chains", () => {
    it("never exceeds the budget agreed when finding 02.1 was closed", () => {
        const total = sources.reduce((sum, path) => sum + countIn(path), 0);
        expect(total).toBeLessThanOrEqual(BUDGET);
    });

    it("stays absent from primitives and generic patterns", () => {
        const offenders = sources
            .filter((path) =>
                SEALED.some((folder) => asPosix(path).startsWith(folder)),
            )
            .filter((path) => countIn(path) > 0)
            .map(asPosix);

        expect(offenders).toEqual([]);
    });
});
