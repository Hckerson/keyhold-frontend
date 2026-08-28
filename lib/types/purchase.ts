import type { EscrowStatus, TransactionStatus } from "@/lib/enums/enums";

export type PurchaseStageId =
    | "agreement"
    | "payment"
    | "inspection"
    | "settlement";

export interface Purchase {
    id: string;
    listingId: string;
    address: string;
    locality: string;
    photo: string | null;
    price: number;
    status: TransactionStatus;
    seller: string;
    sellerPortrait: string | null;
    escrowId: string | null;
    escrowStatus: EscrowStatus | null;
    escrowAmount: number | null;
    inspectionEndsAt: string | null;
    agreementUrl: string | null;
    disputeId: string | null;
    startedAt: string;
    completedAt: string | null;
}
