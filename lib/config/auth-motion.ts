import type {
    Easing,
    TargetAndTransition,
    Transition,
    Variants,
} from "motion/react";

const EASE_SMOOTH: Easing = [0.25, 0.46, 0.45, 0.94];

const FAST_SECONDS = 0.2;
const NORMAL_SECONDS = 0.35;
const STAGGER_SECONDS = 0.04;

const FAST: Transition = { duration: FAST_SECONDS, ease: EASE_SMOOTH };
const NORMAL: Transition = { duration: NORMAL_SECONDS, ease: EASE_SMOOTH };

export interface AuthPresence {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
    transition: Transition;
}

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

export const AUTH_COLLAPSE_MOTION: AuthPresence = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: FAST,
};

export const AUTH_SWAP_MOTION: AuthPresence = {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.7 },
    transition: FAST,
};
