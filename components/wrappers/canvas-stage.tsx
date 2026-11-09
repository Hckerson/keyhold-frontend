"use client";
import { useEffect, useRef } from "react";
import type { CanvasFrame } from "@/lib/types";

interface Props {
    onFrame: (frame: CanvasFrame) => void;
    dprCap: number;
    still?: boolean;
    className?: string;
}

export default function CanvasStage({
    onFrame,
    dprCap,
    still = false,
    className,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef(onFrame);

    useEffect(() => {
        frameRef.current = onFrame;
    }, [onFrame]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const origin = performance.now();
        let width = 0;
        let height = 0;
        let handle = 0;
        let visible = true;

        const draw = (now: number) =>
            frameRef.current({
                canvas,
                width,
                height,
                time: (now - origin) / 1000,
            });
        const loop = (now: number) => {
            draw(now);
            handle = requestAnimationFrame(loop);
        };
        const run = () => {
            cancelAnimationFrame(handle);
            if (!still && visible && !document.hidden)
                handle = requestAnimationFrame(loop);
        };
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, dprCap);
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            draw(performance.now());
        };

        const resizeObserver = new ResizeObserver(resize);
        const intersection = new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
            run();
        });
        resizeObserver.observe(canvas);
        intersection.observe(canvas);
        document.addEventListener("visibilitychange", run);
        run();

        return () => {
            cancelAnimationFrame(handle);
            resizeObserver.disconnect();
            intersection.disconnect();
            document.removeEventListener("visibilitychange", run);
        };
    }, [still, dprCap]);

    return <canvas ref={canvasRef} aria-hidden className={className} />;
}
