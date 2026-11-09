import {
    createRenderTarget,
    disposeRenderTarget,
    linkProgram,
    renderFormat,
    uniformLocator,
} from "@/lib/utils/webgl";
import {
    BLUR_FRAGMENT,
    BRIGHT_FRAGMENT,
    COMPOSITE_FRAGMENT,
    FULLSCREEN_VERTEX,
} from "@/lib/stage/post-shaders";
import type { PostSettings, RenderTarget, Rgb } from "@/lib/types";

const SMALL_TARGETS = 5;
const HORIZONTAL = [1, 0] as const;
const VERTICAL = [0, 1] as const;

export const createPostChain = (
    gl: WebGL2RenderingContext,
    settings: PostSettings,
) => {
    const format = renderFormat(gl);
    const bright = linkProgram(gl, FULLSCREEN_VERTEX, BRIGHT_FRAGMENT);
    const blur = linkProgram(gl, FULLSCREEN_VERTEX, BLUR_FRAGMENT);
    const composite = linkProgram(gl, FULLSCREEN_VERTEX, COMPOSITE_FRAGMENT);
    const brightAt = uniformLocator(gl, bright);
    const blurAt = uniformLocator(gl, blur);
    const compositeAt = uniformLocator(gl, composite);
    const emptyVao = gl.createVertexArray();

    gl.useProgram(bright);
    gl.uniform1f(brightAt("uThreshold"), settings.threshold);
    gl.uniform1f(brightAt("uCeiling"), settings.ceiling);

    gl.useProgram(composite);
    gl.uniform1i(compositeAt("uScene"), 0);
    gl.uniform1i(compositeAt("uBloom"), 1);
    gl.uniform1i(compositeAt("uStreak"), 2);
    gl.uniform1f(compositeAt("uBloomIntensity"), settings.intensity);
    gl.uniform1f(compositeAt("uStreakIntensity"), settings.streak);
    gl.uniform1f(compositeAt("uExposure"), settings.exposure);
    gl.uniform1f(compositeAt("uGrain"), settings.grain);

    let scene: RenderTarget | null = null;
    let small: RenderTarget[] = [];

    const resize = (width: number, height: number): RenderTarget => {
        if (scene && scene.width === width && scene.height === height)
            return scene;
        [...(scene ? [scene] : []), ...small].forEach((target) =>
            disposeRenderTarget(gl, target),
        );
        const smallWidth = Math.max(1, Math.round(width / settings.downscale));
        const smallHeight = Math.max(
            1,
            Math.round(height / settings.downscale),
        );
        small = Array.from({ length: SMALL_TARGETS }, () =>
            createRenderTarget(gl, smallWidth, smallHeight, format),
        );
        scene = createRenderTarget(gl, width, height, format);
        return scene;
    };

    const pass = (
        program: WebGLProgram,
        source: RenderTarget,
        target: RenderTarget,
    ) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
        gl.viewport(0, 0, target.width, target.height);
        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, source.texture);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const blurPass = (
        source: RenderTarget,
        target: RenderTarget,
        direction: readonly [number, number],
        spread: number,
    ) => {
        gl.useProgram(blur);
        gl.uniform2f(
            blurAt("uStep"),
            (direction[0] * spread) / source.width,
            (direction[1] * spread) / source.height,
        );
        pass(blur, source, target);
    };

    return {
        begin(width: number, height: number) {
            const target = resize(width, height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
            gl.viewport(0, 0, width, height);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
        },
        finish(ground: Rgb, time: number) {
            if (!scene) return;
            const [brightTarget, bloomA, bloomB, streakA, streakB] = small;
            gl.disable(gl.BLEND);
            gl.bindVertexArray(emptyVao);

            gl.useProgram(bright);
            gl.uniform2f(brightAt("uTexel"), 1 / scene.width, 1 / scene.height);
            pass(bright, scene, brightTarget);

            let bloomSource = brightTarget;
            for (const spread of settings.passes) {
                blurPass(bloomSource, bloomA, HORIZONTAL, spread);
                blurPass(bloomA, bloomB, VERTICAL, spread);
                bloomSource = bloomB;
            }
            const [streakNear, streakFar] = settings.streakPasses;
            blurPass(brightTarget, streakA, HORIZONTAL, streakNear);
            blurPass(streakA, streakB, HORIZONTAL, streakFar);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, scene.width, scene.height);
            gl.useProgram(composite);
            gl.uniform3f(compositeAt("uGround"), ...ground);
            gl.uniform1f(compositeAt("uTime"), time);
            [scene, bloomB, streakB].forEach((target, unit) => {
                gl.activeTexture(gl.TEXTURE0 + unit);
                gl.bindTexture(gl.TEXTURE_2D, target.texture);
            });
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.activeTexture(gl.TEXTURE0);
        },
    };
};
