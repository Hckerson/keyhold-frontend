import type { Easing, TargetAndTransition, Transition } from "motion/react";

export const EASE_SMOOTH: Easing = [0.25, 0.46, 0.45, 0.94];

export const FAST_SECONDS = 0.2;
export const NORMAL_SECONDS = 0.35;
export const STAGGER_SECONDS = 0.04;

export const FAST: Transition = { duration: FAST_SECONDS, ease: EASE_SMOOTH };
export const NORMAL: Transition = {
    duration: NORMAL_SECONDS,
    ease: EASE_SMOOTH,
};

export interface MotionPresence {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
    transition: Transition;
}

export const MODAL_BACKDROP_MOTION: MotionPresence = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: FAST,
};

export const MODAL_PLATE_MOTION: MotionPresence = {
    initial: { opacity: 0, scale: 0.96, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: 8 },
    transition: FAST,
};

export const CONTENT_SWAP_MOTION: MotionPresence = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: FAST,
};

export const TABLE_ROW_MOTION: MotionPresence = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: FAST,
};

export const LIST_ROW_MOTION: MotionPresence = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: FAST,
};

export const COLLAPSE_MOTION: MotionPresence = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: FAST,
};

export const ENTRY_MOTION: MotionPresence = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: NORMAL,
};
