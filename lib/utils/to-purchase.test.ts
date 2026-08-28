import { describe, expect, it } from "vitest";
import { aTransaction, anEscrowHold } from "@/lib/data/__fixtures__/purchases";
import { toPurchase, toPurchases } from "@/lib/utils/to-purchase";

describe("toPurchase · reading the hold", () => {
    it("1.1 leaves every escrow field null when the transaction has no hold", () => {
        const purchase = toPurchase(
            aTransaction({ escrowHold: null, escrowHoldId: null }),
        );

        expect(purchase.escrowId).toBeNull();
        expect(purchase.escrowStatus).toBeNull();
        expect(purchase.escrowAmount).toBeNull();
        expect(purchase.inspectionEndsAt).toBeNull();
    });

    it("1.2 falls back to escrowHoldId when the hold is not expanded", () => {
        expect(
            toPurchase(
                aTransaction({ escrowHold: null, escrowHoldId: "esc_9" }),
            ).escrowId,
        ).toBe("esc_9");
    });

    it("1.2 yields a null escrow id when neither the hold nor its id is present", () => {
        expect(
            toPurchase(
                aTransaction({ escrowHold: null, escrowHoldId: undefined }),
            ).escrowId,
        ).toBeNull();
    });

    it("1.3 maps a missing property and seller to empty strings", () => {
        const purchase = toPurchase(
            aTransaction({ property: undefined, seller: undefined }),
        );

        expect(purchase.address).toBe("");
        expect(purchase.locality).toBe("");
        expect(purchase.seller).toBe("");
        expect(purchase.photo).toBeNull();
        expect(purchase.sellerPortrait).toBeNull();
    });

    it("1.3 maps a property with no images to a null photo", () => {
        expect(
            toPurchase(
                aTransaction({
                    property: {
                        id: "prop_1",
                        title: "Cypress Point",
                        price: 1_250_000,
                        address: "18 Cypress Point",
                        locality: "Carmel",
                        status: "AVAILABLE",
                        images: [],
                    },
                }),
            ).photo,
        ).toBeNull();
    });

    it("1.4 takes the price from finalPrice, not from the listing", () => {
        const purchase = toPurchase(aTransaction());

        expect(purchase.price).toBe(1_150_000);
        expect(purchase.price).not.toBe(1_250_000);
    });

    it("1.5 takes the escrow amount from the hold, never from the price", () => {
        const purchase = toPurchase(
            aTransaction({
                finalPrice: 900_000,
                escrowHold: anEscrowHold({ amount: 50_000 }),
            }),
        );

        expect(purchase.escrowAmount).toBe(50_000);
    });

    it("1.6 maps an empty list to an empty list", () => {
        expect(toPurchases([])).toEqual([]);
    });

    it("preserves order and count across the list", () => {
        const purchases = toPurchases([
            aTransaction({ id: "txn_1" }),
            aTransaction({ id: "txn_2" }),
        ]);

        expect(purchases.map((purchase) => purchase.id)).toEqual([
            "txn_1",
            "txn_2",
        ]);
    });
});
