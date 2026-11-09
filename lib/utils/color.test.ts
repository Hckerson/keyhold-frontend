import { describe, expect, it } from "vitest";
import { hexToRgb, tokenRgb } from "@/lib/utils/color";

describe("hexToRgb", () => {
    it("reads six-digit hex as 0-1 channels", () => {
        expect(hexToRgb("#ff8000")).toEqual([1, 128 / 255, 0]);
    });

    it("expands three-digit hex and ignores surrounding space", () => {
        expect(hexToRgb(" #fff ")).toEqual([1, 1, 1]);
    });

    it("rejects a colour that is not hex", () => {
        expect(() => hexToRgb("oklch(0.7 0.1 50)")).toThrow();
    });
});

describe("tokenRgb", () => {
    it("reads a colour token from computed style", () => {
        expect(
            tokenRgb({ getPropertyValue: () => " #000000" }, "--colors-ground"),
        ).toEqual([0, 0, 0]);
    });
});
