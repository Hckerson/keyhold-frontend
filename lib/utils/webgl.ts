import type { RenderTarget } from "@/lib/types";

export interface TargetFormat {
    internal: GLenum;
    type: GLenum;
}

export const glFloat = (value: number): string => value.toFixed(5);

export const renderFormat = (gl: WebGL2RenderingContext): TargetFormat =>
    gl.getExtension("EXT_color_buffer_float")
        ? { internal: gl.RGBA16F, type: gl.HALF_FLOAT }
        : { internal: gl.RGBA8, type: gl.UNSIGNED_BYTE };

export const createRenderTarget = (
    gl: WebGL2RenderingContext,
    width: number,
    height: number,
    format: TargetFormat,
): RenderTarget => {
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    if (!texture || !framebuffer)
        throw new Error("WebGL could not allocate a render target");

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        format.internal,
        width,
        height,
        0,
        gl.RGBA,
        format.type,
        null,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0,
    );

    return { framebuffer, texture, width, height };
};

export const disposeRenderTarget = (
    gl: WebGL2RenderingContext,
    target: RenderTarget,
): void => {
    gl.deleteFramebuffer(target.framebuffer);
    gl.deleteTexture(target.texture);
};

export const uniformLocator = (
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
) => {
    const cache = new Map<string, WebGLUniformLocation | null>();

    return (name: string): WebGLUniformLocation | null => {
        if (!cache.has(name))
            cache.set(name, gl.getUniformLocation(program, name));
        return cache.get(name) ?? null;
    };
};

const compileShader = (
    gl: WebGL2RenderingContext,
    type: GLenum,
    source: string,
): WebGLShader => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("WebGL could not allocate a shader");

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(
            gl.getShaderInfoLog(shader) ?? "Shader failed to compile",
        );
    }

    return shader;
};

export const linkProgram = (
    gl: WebGL2RenderingContext,
    vertexSource: string,
    fragmentSource: string,
): WebGLProgram => {
    const program = gl.createProgram();
    if (!program) throw new Error("WebGL could not allocate a program");

    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(
        program,
        compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource),
    );
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(
            gl.getProgramInfoLog(program) ?? "Shader program failed to link",
        );
    }

    return program;
};
