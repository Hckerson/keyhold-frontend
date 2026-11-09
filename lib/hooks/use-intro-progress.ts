import { useEffect } from "react";
import {
    animate,
    useMotionValue,
    useReducedMotion,
    type MotionValue,
} from "motion/react";
import type { IntroMotion } from "@/lib/types";

export const useIntroProgress = ({
    duration,
    ease,
}: IntroMotion): MotionValue<number> => {
    const still = useReducedMotion() ?? false;
    const intro = useMotionValue(0);

    useEffect(() => {
        if (still) {
            intro.set(1);
            return;
        }
        const controls = animate(intro, 1, { duration, ease });
        return () => controls.stop();
    }, [intro, still, duration, ease]);

    return intro;
};
