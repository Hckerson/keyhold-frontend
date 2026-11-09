import { useEffect } from "react";
import { useMotionValue, useSpring, type SpringOptions } from "motion/react";
import type { DampedPointer } from "@/lib/types";

export const useDampedPointer = (spring: SpringOptions): DampedPointer => {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const rawPresence = useMotionValue(0);
    const x = useSpring(rawX, spring);
    const y = useSpring(rawY, spring);
    const presence = useSpring(rawPresence, spring);

    useEffect(() => {
        const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            rawX.set((event.clientX / window.innerWidth) * 2 - 1);
            rawY.set((event.clientY / window.innerHeight) * 2 - 1);
            rawPresence.set(1);
        };
        const leave = () => rawPresence.set(0);

        window.addEventListener("pointermove", move, { passive: true });
        document.documentElement.addEventListener("pointerleave", leave);

        return () => {
            window.removeEventListener("pointermove", move);
            document.documentElement.removeEventListener("pointerleave", leave);
        };
    }, [rawX, rawY, rawPresence]);

    return { x, y, presence };
};
