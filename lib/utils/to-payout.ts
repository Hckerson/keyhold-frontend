import { ADMIN_ROUTES } from "@/lib/config/routes";
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
        ? ADMIN_ROUTES.transaction(escrow.transaction.id)
        : ADMIN_ROUTES.transactions,
});

export const toPayouts = (holds: Escrow[]): Payout[] => holds.map(toPayout);
