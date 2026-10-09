import { describe, expect, it } from "vitest";
import { resolveDisputeDtoSchema } from "@/lib/contract/schemas";
import { DISPUTE_OUTCOMES } from "@/lib/enums/enums";

describe("DISPUTE_OUTCOMES", () => {
    it("offers exactly the outcomes the server's resolve contract accepts", () => {
        expect([...DISPUTE_OUTCOMES]).toEqual(
            resolveDisputeDtoSchema.shape.outcome.unwrap().options,
        );
    });
});
