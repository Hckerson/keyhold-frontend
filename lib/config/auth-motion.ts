import type { Variants } from "motion/react";
import {
    FAST,
    FAST_SECONDS,
    NORMAL,
    STAGGER_SECONDS,
    type MotionPresence,
} from "@/lib/config/motion";

export const AUTH_PLANE_MOTION: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ...NORMAL,
            delayChildren: FAST_SECONDS,
            staggerChildren: STAGGER_SECONDS,
        },
    },
    gone: { opacity: 0, y: -8, transition: FAST },
};

export const AUTH_SECTION_MOTION: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: NORMAL },
};

export const AUTH_COLLAPSE_MOTION: MotionPresence = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: FAST,
};

export const AUTH_SWAP_MOTION: MotionPresence = {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.7 },
    transition: FAST,
};
