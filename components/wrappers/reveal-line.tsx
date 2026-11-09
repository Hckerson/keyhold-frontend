"use client";
import type { ReactNode } from "react";
import {
    motion,
    useReducedMotion,
    useTransform,
    type MotionValue,
} from "motion/react";
import { lineTimeline } from "@/lib/stage/choreography";
import type { RevealTiming, SceneEdge, SceneRange } from "@/lib/types";

interface Props {
    progress: MotionValue<number>;
    range: SceneRange;
    index: number;
    edge: SceneEdge;
    timing: RevealTiming;
    className?: string;
    children: ReactNode;
}

export default function RevealLine({
    progress,
    range,
    index,
    edge,
    timing,
    className,
    children,
}: Props) {
    const still = useReducedMotion() ?? false;
    const timeline = lineTimeline(range, index, edge, still, timing);
    const opacity = useTransform(progress, timeline.input, timeline.opacity, {
        ease: timeline.ease,
    });
    const y = useTransform(progress, timeline.input, timeline.y, {
        ease: timeline.ease,
    });
    const intro = edge.intro && !still;

    return (
        <span className="-mb-(--paddings-descender) block overflow-hidden pb-(--paddings-descender)">
            <motion.span
                className="block"
                initial={intro ? { y: "100%" } : false}
                animate={{ y: "0%" }}
                transition={{
                    duration: timing.introDuration,
                    delay: index * timing.introStagger,
                    ease: timing.introEase,
                }}
            >
                <motion.span
                    className={className ? `block ${className}` : "block"}
                    style={{ opacity, y }}
                >
                    {children}
                </motion.span>
            </motion.span>
        </span>
    );
}
