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
