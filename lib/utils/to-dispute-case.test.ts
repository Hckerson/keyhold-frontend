import { describe, expect, it } from "vitest";
import { toDisputeQueue } from "@/lib/utils/to-dispute-case";
import {
    aDispute,
    aFrozenHold,
    anEvidence,
} from "@/lib/data/__fixtures__/disputes";

describe("toDisputeQueue", () => {
    it("1.1 shows the hold each deal froze, with the amount taken from the hold", () => {
        const [dispute] = toDisputeQueue([aDispute()], [aFrozenHold()]);

        expect(dispute.deals[0]).toMatchObject({
            price: 2_240_000,
            holdId: "esc_1",
            escrow: { amount: 67_200, status: "DISPUTED" },
        });
    });

    it("1.2 leaves the escrow figure empty, never zero, when the hold was not returned", () => {
        const [dispute] = toDisputeQueue([aDispute()], []);

        expect(dispute.deals[0].escrow).toBeNull();
        expect(dispute.deals[0].holdId).toBe("esc_1");
    });

    it("1.5 names the deal's buyer and seller from the hold it froze", () => {
        const [dispute] = toDisputeQueue([aDispute()], [aFrozenHold()]);

        expect(dispute.deals[0].parties).toEqual({
            buyer: { id: "usr_buyer", name: "Christ Streich" },
            seller: { id: "usr_seller", name: "Marta Vance" },
        });
    });

    it("names linked evidence by its file and keeps a message as text", () => {
        const [dispute] = toDisputeQueue([
            aDispute({
                evidence: [
                    anEvidence(),
                    anEvidence({
                        id: "dev_2",
                        type: "MESSAGE",
                        content: "Seller agreed to release on the 3rd.",
                        label: null,
                    }),
                ],
            }),
        ]);

        expect(dispute.evidence).toEqual([
            expect.objectContaining({
                text: "closing-statement.pdf",
                href: "https://files.example.com/evidence/closing-statement.pdf",
            }),
            expect.objectContaining({
                label: "Message",
                text: "Seller agreed to release on the 3rd.",
                href: null,
            }),
        ]);
    });

    it("names a link with no file in its path by its host", () => {
        const [dispute] = toDisputeQueue([
            aDispute({
                evidence: [
                    anEvidence({ content: "https://files.example.com/" }),
                ],
            }),
        ]);

        expect(dispute.evidence[0].text).toBe("files.example.com");
    });
});
