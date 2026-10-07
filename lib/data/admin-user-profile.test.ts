import { describe, expect, it } from "vitest";
import { aMemberRecord, aSuspension } from "@/lib/data/__fixtures__/users";
import {
    profileDetails,
    profileRecord,
    statusNotice,
} from "@/lib/data/admin-user-profile";
import { toManagedUser } from "@/lib/utils/to-managed-user";

describe("statusNotice", () => {
    it("says nothing about an active account", () => {
        expect(statusNotice(toManagedUser(aMemberRecord()), [])).toBeNull();
    });

    it("gives the reason of the suspension still in force", () => {
        const notice = statusNotice(
            toManagedUser(aMemberRecord({ status: "SUSPENDED" })),
            [
                aSuspension({
                    reason: "Old reason",
                    liftedAt: "2026-07-01T09:00:00.000Z",
                }),
                aSuspension({ id: "sus_live", reason: "Fake listings" }),
            ],
        );

        expect(notice?.description).toBe("Fake listings");
    });

    it("falls back to the status explanation when no suspension is recorded", () => {
        const notice = statusNotice(
            toManagedUser(aMemberRecord({ status: "SUSPENDED" })),
            [],
        );

        expect(notice?.tone).toBe("error");
        expect(notice?.description).toMatch(/cannot list/);
    });
});

describe("profileDetails", () => {
    it("leaves out profile fields the account never filled in", () => {
        expect(
            profileDetails(
                aMemberRecord({ jobTitle: "Broker", agencyName: null }),
            ).map((detail) => detail.id),
        ).toEqual(["jobTitle"]);
    });
});

describe("profileRecord", () => {
    it("mutes lifetime volume and says no deals have closed for a new account", () => {
        const [volume] = profileRecord(
            toManagedUser(aMemberRecord({ volume: 0, transactions: 0 })),
        );

        expect(volume).toMatchObject({
            tone: "neutral",
            caption: "No deals closed yet",
        });
    });
});
