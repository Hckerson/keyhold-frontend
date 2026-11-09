import { describe, expect, it } from "vitest";
import { glFloat } from "@/lib/utils/webgl";

describe("glFloat", () => {
    it("writes numbers as GLSL float literals, whole numbers included", () => {
        expect(glFloat(1)).toBe("1.00000");
        expect(glFloat(0.035)).toBe("0.03500");
    });
});
