import { describe, expect, it } from "vitest";
import { apportion } from "@/lib/utils/math";

describe("apportion", () => {
    it("hands out every unit, giving the leftovers to the largest remainders", () => {
        expect(apportion([464, 56, 49], 100)).toEqual([81, 10, 9]);
    });

    it("never draws a unit for a category that has none", () => {
        expect(apportion([5, 0, 6], 100)).toEqual([45, 0, 55]);
    });

    it("draws nothing when there is nothing to share", () => {
        expect(apportion([0, 0], 100)).toEqual([0, 0]);
    });
});
