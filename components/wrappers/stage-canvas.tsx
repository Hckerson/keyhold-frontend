"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, type CanvasProps, type RootState } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { WebGPURenderer } from "three/webgpu";
import type { ToneMapping } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { STAGE_WEBGL_PARAM } from "@/lib/constants";

const DEVELOPMENT = process.env.NODE_ENV !== "production";

interface Props {
    dpr: readonly [number, number];
    antialias: boolean;
    toneMapping: ToneMapping;
    exposure: number;
    camera?: CanvasProps["camera"];
    className?: string;
    children: ReactNode;
}

export default function StageCanvas({
    dpr,
    antialias,
    toneMapping,
    exposure,
    camera,
    className,
    children,
}: Props) {
    const stageRef = useRef<HTMLDivElement>(null);
    const advanceRef = useRef<RootState["advance"] | null>(null);
    const [factor, setFactor] = useState(1);
    const still = useReducedMotion() ?? false;
    const [minDpr, maxDpr] = dpr;

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage || still) return;
        let onScreen = false;
        const trigger = ScrollTrigger.create({
            trigger: stage,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
                onScreen = self.isActive;
            },
        });
        onScreen = trigger.isActive;
        const tick = (time: number) => {
            if (onScreen) advanceRef.current?.(time * 1000);
        };
        gsap.ticker.add(tick);
        return () => {
            gsap.ticker.remove(tick);
            trigger.kill();
        };
    }, [still]);

    const createRenderer = async ({ canvas }: { canvas: unknown }) => {
        if (!(canvas instanceof HTMLCanvasElement))
            throw new Error("The stage renders to a DOM canvas");
        const renderer = new WebGPURenderer({
            canvas,
            antialias,
            forceWebGL:
                DEVELOPMENT &&
                new URLSearchParams(window.location.search).has(
                    STAGE_WEBGL_PARAM,
                ),
            powerPreference: "high-performance",
        });
        await renderer.init();
        return renderer;
    };

    const onCreated = (state: RootState) => {
        state.gl.toneMapping = toneMapping;
        state.gl.toneMappingExposure = exposure;
        advanceRef.current = state.advance;
        if (
            DEVELOPMENT &&
            stageRef.current &&
            state.gl instanceof WebGPURenderer
        )
            stageRef.current.dataset.stageBackend =
                "isWebGPUBackend" in state.gl.backend ? "webgpu" : "webgl";
    };

    return (
        <div ref={stageRef} aria-hidden className={className}>
            <Canvas
                gl={createRenderer}
                flat
                frameloop={still ? "demand" : "never"}
                dpr={[minDpr, minDpr + (maxDpr - minDpr) * factor]}
                camera={camera}
                onCreated={onCreated}
            >
                <PerformanceMonitor
                    onChange={({ factor: next }) => setFactor(next)}
                />
                {children}
            </Canvas>
        </div>
    );
}
