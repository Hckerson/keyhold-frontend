export const FULLSCREEN_VERTEX = `#version 300 es
out vec2 vUv;

void main() {
    vec2 corner = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
    vUv = corner;
    gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}
`;

export const BRIGHT_FRAGMENT = `#version 300 es
precision mediump float;
uniform sampler2D uSource;
uniform vec2 uTexel;
uniform float uThreshold;
uniform float uCeiling;
in vec2 vUv;
out vec4 outColor;

void main() {
    vec3 color = texture(uSource, vUv + uTexel * vec2(-1.0, -1.0)).rgb
        + texture(uSource, vUv + uTexel * vec2(1.0, -1.0)).rgb
        + texture(uSource, vUv + uTexel * vec2(-1.0, 1.0)).rgb
        + texture(uSource, vUv + uTexel * vec2(1.0, 1.0)).rgb;
    color *= 0.25;
    float luminance = max(dot(color, vec3(0.2126, 0.7152, 0.0722)), 0.0001);
    color *= min(1.0, uCeiling / luminance);
    luminance = min(luminance, uCeiling);
    outColor = vec4(color * max(luminance - uThreshold, 0.0) / luminance, 1.0);
}
`;

export const BLUR_FRAGMENT = `#version 300 es
precision mediump float;
uniform sampler2D uSource;
uniform vec2 uStep;
in vec2 vUv;
out vec4 outColor;

void main() {
    vec3 color = texture(uSource, vUv).rgb * 0.2270270270;
    color += (texture(uSource, vUv + uStep * 1.3846153846).rgb
        + texture(uSource, vUv - uStep * 1.3846153846).rgb) * 0.3162162162;
    color += (texture(uSource, vUv + uStep * 3.2307692308).rgb
        + texture(uSource, vUv - uStep * 3.2307692308).rgb) * 0.0702702703;
    outColor = vec4(color, 1.0);
}
`;

export const COMPOSITE_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform sampler2D uStreak;
uniform vec3 uGround;
uniform float uTime;
uniform float uBloomIntensity;
uniform float uStreakIntensity;
uniform float uExposure;
uniform float uGrain;
in vec2 vUv;
out vec4 outColor;

void main() {
    vec3 light = texture(uScene, vUv).rgb
        + texture(uBloom, vUv).rgb * uBloomIntensity
        + texture(uStreak, vUv).rgb * uStreakIntensity;
    vec3 color = 1.0 - exp(-light * uExposure);
    float noise = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 97.0, vec2(12.9898, 78.233))) * 43758.5453);
    outColor = vec4(uGround + color + (noise - 0.5) * uGrain, 1.0);
}
`;
