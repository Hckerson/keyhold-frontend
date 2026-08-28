import type { Payout } from "@/lib/types/admin";
import type { Escrow } from "@/lib/validations/escrow";
import { minutesSince } from "@/lib/utils/elapsed";

const UNKNOWN_PARTY = "Unassigned";
const UNKNOWN_DEAL = "Unlinked hold";

export const toPayout = (escrow: Escrow): Payout => ({
    id: escrow.id,
    recipient: escrow.transaction?.seller.fullName ?? UNKNOWN_PARTY,
    deal: escrow.transaction?.property.address ?? UNKNOWN_DEAL,
    state: escrow.status,
    gross: escrow.amount,
    ageMinutes: minutesSince(escrow.createdAt),
    inspectionEndsAt: escrow.inspectionEndDate,
    href: escrow.transaction
        ? `/admin/transactions?transaction=${escrow.transaction.id}`
        : "/admin/transactions",
});

export const toPayouts = (holds: Escrow[]): Payout[] => holds.map(toPayout);
