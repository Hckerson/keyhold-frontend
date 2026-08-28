import { describe, expect, it } from "vitest";
import { rovingIndex } from "@/lib/utils/roving";

describe("rovingIndex", () => {
    it("steps forward through the list", () => {
        expect(rovingIndex(0, 1, 4)).toBe(1);
    });

    it("wraps past the last item back to the first", () => {
        expect(rovingIndex(3, 1, 4)).toBe(0);
    });

    it("wraps before the first item round to the last", () => {
        expect(rovingIndex(0, -1, 4)).toBe(3);
    });

    it("stays at zero when there is nothing to move through", () => {
        expect(rovingIndex(0, -1, 0)).toBe(0);
    });
});
