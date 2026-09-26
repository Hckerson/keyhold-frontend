import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FAST_SECONDS, NORMAL_SECONDS } from "./motion";

const DURATION_TOKEN = /--durations-(\w+):\s*(\d+)ms;/g;

const durationTokens = () =>
    Object.fromEntries(
        [
            ...readFileSync(
                join(process.cwd(), "styles", "tokens.css"),
                "utf8",
            ).matchAll(DURATION_TOKEN),
        ].map(([, name, ms]) => [name, Number(ms) / 1000]),
    );

describe("motion durations", () => {
    it("mirror the --durations-* tokens in styles/tokens.css", () => {
        expect({ fast: FAST_SECONDS, normal: NORMAL_SECONDS }).toEqual({
            fast: durationTokens().fast,
            normal: durationTokens().normal,
        });
    });
});
