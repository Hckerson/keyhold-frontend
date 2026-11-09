import type {
    BezierDefinition,
    EasingFunction,
    MotionValue,
} from "motion/react";

export interface CanvasFrame {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    time: number;
}

export interface RenderTarget {
    framebuffer: WebGLFramebuffer;
    texture: WebGLTexture;
    width: number;
    height: number;
}

export type Rgb = readonly [number, number, number];

export interface DampedPointer {
    x: MotionValue<number>;
    y: MotionValue<number>;
    presence: MotionValue<number>;
}

export interface PointerSample {
    x: number;
    y: number;
    presence: number;
}

export type SceneRange = readonly [number, number];

export type SceneAnchor = "lead" | "trail" | "split" | "foot";

export interface SceneEdge {
    intro: boolean;
    final: boolean;
}

export interface LineTimeline {
    input: number[];
    opacity: number[];
    y: string[];
    ease: EasingFunction[];
}

export interface RevealTiming {
    enter: number;
    stagger: number;
    exit: number;
    overlap: number;
    easeIn: BezierDefinition;
    easeOut: BezierDefinition;
    introDuration: number;
    introStagger: number;
    introEase: BezierDefinition;
}

export interface IntroMotion {
    duration: number;
    ease: BezierDefinition;
}

export interface PostSettings {
    downscale: number;
    threshold: number;
    ceiling: number;
    intensity: number;
    passes: readonly number[];
    streak: number;
    streakPasses: readonly [number, number];
    exposure: number;
    grain: number;
}
