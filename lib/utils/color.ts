import type { Rgb } from "@/lib/types";

const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export const hexToRgb = (hex: string): Rgb => {
    const match = HEX_COLOR.exec(hex.trim());
    if (!match)
        throw new Error(`Expected a #rgb or #rrggbb colour, got "${hex}"`);

    const digits =
        match[1].length === 3
            ? [...match[1]].map((digit) => digit + digit).join("")
            : match[1];
    const value = Number.parseInt(digits, 16);

    return [
        ((value >> 16) & 255) / 255,
        ((value >> 8) & 255) / 255,
        (value & 255) / 255,
    ];
};

export const tokenRgb = (
    style: Pick<CSSStyleDeclaration, "getPropertyValue">,
    token: string,
): Rgb => hexToRgb(style.getPropertyValue(token));
