import type { Variants } from "motion/react";
import {
    FAST,
    NORMAL,
    NORMAL_SECONDS,
    type MotionPresence,
} from "@/lib/config/motion";

const RESULT_STAGGER_SECONDS = 0.025;

export const SEARCH_RESULTS_MOTION: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ...NORMAL, staggerChildren: RESULT_STAGGER_SECONDS },
    },
    gone: { opacity: 0, y: -6, transition: FAST },
};

export const SEARCH_RESULT_MOTION: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: NORMAL_SECONDS } },
};

export const SEARCH_FILTER_BAR_MOTION: MotionPresence = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: FAST,
};

export const SEARCH_CHIP_MOTION: MotionPresence = {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
    transition: FAST,
};

export const GALLERY_FRAME_MOTION: MotionPresence = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: NORMAL,
};

export const REVEAL_MOTION: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: NORMAL },
};

export const REVEAL_VIEWPORT = { once: true, amount: 0.15 } as const;

export const SCROLL_NARRATIVE_BAND = "-45% 0px -45% 0px";

export const SCROLL_HEADING_TRAIL = "-96px 0px -70% 0px";
