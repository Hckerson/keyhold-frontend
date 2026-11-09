import { describe, expect, it } from "vitest";
import { lineTimeline, sceneAnchorTop } from "@/lib/stage/choreography";
import type { RevealTiming, SceneEdge } from "@/lib/types";

const TIMING: RevealTiming = {
    enter: 0.3,
    stagger: 0.05,
    exit: 0.2,
    overlap: 0.08,
    easeIn: [0.22, 1, 0.36, 1],
    easeOut: [0.64, 0, 0.78, 0],
    introDuration: 0.8,
    introStagger: 0.12,
    introEase: [0, 0, 0.58, 1],
};
const MIDDLE: SceneEdge = { intro: false, final: false };
const rounded = (values: number[]) =>
    values.map((value) => Number(value.toFixed(3)));

describe("lineTimeline", () => {
    it("staggers each line into its scene and hands over before the next", () => {
        expect(
            rounded(lineTimeline([0.2, 0.6], 2, MIDDLE, false, TIMING).input),
        ).toEqual([0.208, 0.328, 0.52, 0.632]);
    });

    it("shows intro lines from the first frame and keeps final lines past the end", () => {
        expect(
            lineTimeline(
                [0, 0.5],
                0,
                { intro: true, final: false },
                false,
                TIMING,
            ).input.slice(0, 2),
        ).toEqual([-1, -0.5]);
        expect(
            lineTimeline(
                [0.5, 1],
                0,
                { intro: false, final: true },
                false,
                TIMING,
            ).input.slice(2),
        ).toEqual([1.5, 2]);
    });

    it("slides lines under normal motion and only fades them under reduced motion", () => {
        expect(lineTimeline([0, 1], 0, MIDDLE, false, TIMING).y).toEqual([
            "100%",
            "0%",
            "0%",
            "-100%",
        ]);
        expect(lineTimeline([0, 1], 0, MIDDLE, true, TIMING).y).toEqual([
            "0%",
            "0%",
            "0%",
            "0%",
        ]);
    });

    it("eases in and out on the build's curves and holds linearly between", () => {
        const [easeIn, hold, easeOut] = lineTimeline(
            [0, 1],
            0,
            MIDDLE,
            false,
            TIMING,
        ).ease;
        expect(easeIn(0.5)).toBeGreaterThan(0.5);
        expect(hold(0.3)).toBe(0.3);
        expect(easeOut(0.5)).toBeLessThan(0.5);
    });
});

describe("sceneAnchorTop", () => {
    it("places the anchor at the scene's midpoint along the sticky track", () => {
        expect(sceneAnchorTop([0, 0.5], 2)).toBe("12.5%");
    });
});
