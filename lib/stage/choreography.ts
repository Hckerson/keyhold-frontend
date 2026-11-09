import { cubicBezier } from "motion/react";
import type {
    LineTimeline,
    RevealTiming,
    SceneEdge,
    SceneRange,
} from "@/lib/types";

const HIDDEN_BELOW = "100%";
const RESTING = "0%";
const HIDDEN_ABOVE = "-100%";

export const lineTimeline = (
    range: SceneRange,
    index: number,
    edge: SceneEdge,
    still: boolean,
    timing: RevealTiming,
): LineTimeline => {
    const [start, end] = range;
    const span = end - start;
    const enterStart = edge.intro
        ? start - 1
        : start + (index * timing.stagger - timing.overlap) * span;
    const enterEnd = edge.intro
        ? start - 0.5
        : enterStart + timing.enter * span;
    const exitStart = edge.final ? end + 0.5 : end - timing.exit * span;
    const exitEnd = edge.final ? end + 1 : end + timing.overlap * span;

    return {
        input: [enterStart, enterEnd, exitStart, exitEnd],
        opacity: [0, 1, 1, 0],
        y: still
            ? [RESTING, RESTING, RESTING, RESTING]
            : [HIDDEN_BELOW, RESTING, RESTING, HIDDEN_ABOVE],
        ease: [
            cubicBezier(...timing.easeIn),
            (t) => t,
            cubicBezier(...timing.easeOut),
        ],
    };
};

export const sceneAnchorTop = (range: SceneRange, sceneCount: number): string =>
    `${(((range[0] + range[1]) / 2) * (sceneCount - 1) * 100) / sceneCount}%`;
