import { describe, expect, it } from "vitest";
import { generatePassword } from "@/lib/utils/password";

describe("generatePassword", () => {
    it("produces a password of exactly the requested length", () => {
        expect(generatePassword(14)).toHaveLength(14);
    });

    it("never uses characters that are easy to misread aloud", () => {
        expect(generatePassword(500)).not.toMatch(/[0O1lI]/);
    });

    it("gives a different password each time", () => {
        expect(generatePassword(14)).not.toBe(generatePassword(14));
    });
});
