import { PAYOUT_PHASES, PAYOUT_STATES } from "@/lib/config/payout-tones";
import { inspectionDaysLeft } from "@/lib/data/admin-payments";
import { formatAge, formatDayAndMonth } from "@/lib/utils";
import type { Payout, PayoutPhase } from "@/lib/types";

const MINUTE_MS = 60_000;
const NO_DATE = "—";

const settled = (phase: PayoutPhase) =>
    phase === "paid" || phase === "refunded";

const minutesSinceWindow = (payout: Payout, now: Date) =>
    payout.inspectionEndsAt
        ? Math.max(
              0,
              Math.floor(
                  (now.getTime() -
                      new Date(payout.inspectionEndsAt).getTime()) /
                      MINUTE_MS,
              ),
          )
        : payout.ageMinutes;

export const payoutPhaseOf = (
    payout: Payout,
    now = new Date(),
): PayoutPhase => {
    if (payout.state === "DISPUTED") return "disputed";
    if (payout.state === "REFUNDED") return "refunded";
    if (!PAYOUT_STATES[payout.state].held) return "paid";
    return (inspectionDaysLeft(payout, now) ?? 0) > 0 ? "inspecting" : "ready";
};

export const payoutTiming = (payout: Payout, now = new Date()) => {
    const phase = payoutPhaseOf(payout, now);

    if (settled(phase)) {
        return payout.settledAt
            ? formatDayAndMonth(new Date(payout.settledAt))
            : NO_DATE;
    }
    if (phase === "inspecting") {
        return `Closes in ${inspectionDaysLeft(payout, now) ?? 0}d`;
    }
    if (phase === "ready") {
        return `Ready ${formatAge(minutesSinceWindow(payout, now))}`;
    }
    return `${formatAge(payout.ageMinutes)} held`;
};

export const payoutMoment = (payout: Payout, now = new Date()) =>
    payout.settledAt
        ? new Date(payout.settledAt).getTime()
        : now.getTime() - payout.ageMinutes * MINUTE_MS;

export const orderPayouts = (payouts: Payout[], now = new Date()) =>
    [...payouts].sort((a, b) => {
        const phaseA = payoutPhaseOf(a, now);
        const phaseB = payoutPhaseOf(b, now);
        const byPhase = PAYOUT_PHASES[phaseA].rank - PAYOUT_PHASES[phaseB].rank;
        if (byPhase !== 0) return byPhase;
        return settled(phaseA)
            ? payoutMoment(b, now) - payoutMoment(a, now)
            : b.ageMinutes - a.ageMinutes;
    });
