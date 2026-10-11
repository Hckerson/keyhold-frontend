import { describe, expect, it } from "vitest";
import { toVerificationRequest } from "@/lib/utils/to-verification-request";
import { anIdentityDocument } from "@/lib/data/__fixtures__/verifications";

describe("toVerificationRequest", () => {
    it("names a coded document type and issuing country the way a reviewer reads them", () => {
        expect(toVerificationRequest(anIdentityDocument())).toMatchObject({
            documentType: "Driver's licence",
            issuer: "United States",
            role: "Agent",
        });
    });

    it("keeps a document type or country the applicant typed in full", () => {
        expect(
            toVerificationRequest(
                anIdentityDocument({
                    documentType: "Residence permit",
                    issuerCountry: "Nigeria",
                }),
            ),
        ).toMatchObject({
            documentType: "Residence permit",
            issuer: "Nigeria",
        });
    });

    it("dates a verification by its approval and a rejection by its last update", () => {
        expect(
            toVerificationRequest(
                anIdentityDocument({
                    status: "VERIFIED",
                    verifiedAt: "2026-10-02T12:00:00.000Z",
                }),
            ).decidedAt,
        ).toBe("2026-10-02T12:00:00.000Z");
        expect(
            toVerificationRequest(anIdentityDocument({ status: "REJECTED" }))
                .decidedAt,
        ).toBe("2026-09-30T12:00:00.000Z");
        expect(
            toVerificationRequest(anIdentityDocument()).decidedAt,
        ).toBeNull();
    });
});
