import {
    useScroll,
    useSpring,
    type MotionValue,
    type SpringOptions,
} from "motion/react";
import type { RefObject } from "react";

export const useSceneProgress = (
    target: RefObject<HTMLElement | null>,
    spring: SpringOptions,
): MotionValue<number> => {
    const { scrollYProgress } = useScroll({
        target,
        offset: ["start start", "end end"],
    });

    return useSpring(scrollYProgress, spring);
};
