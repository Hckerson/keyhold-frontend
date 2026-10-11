import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import { inspectionDaysLeft } from "@/lib/data/admin-payments";
import { formatAge } from "@/lib/utils";
import type { Payout, PayoutStep } from "@/lib/types";

const dayCount = (days: number) => `${days} day${days === 1 ? "" : "s"}`;

const inspectionStep = (payout: Payout, now: Date): PayoutStep => {
    const days = inspectionDaysLeft(payout, now);
    const left = days ?? 0;
    const open = PAYOUT_STATES[payout.state].held && left > 0;

    return {
        id: "inspection",
        label: "Inspection window",
        detail: open ? `Closes in ${dayCount(left)}` : "Closed",
        state: open ? "current" : "done",
    };
};

const releaseStep = (payout: Payout, inspecting: boolean): PayoutStep => {
    if (payout.state === "RELEASED")
        return {
            id: "release",
            label: "Released to agent",
            detail: "Paid out",
            state: "done",
        };
    if (payout.state === "REFUNDED")
        return {
            id: "release",
            label: "Refunded to buyer",
            detail: "Returned instead of paid out",
            state: "done",
        };
    if (payout.state === "DISPUTED")
        return {
            id: "release",
            label: "Release to agent",
            detail: "On hold while the dispute is open",
            state: "blocked",
        };
    return {
        id: "release",
        label: "Release to agent",
        detail: inspecting
            ? "Unlocks once inspection closes"
            : "Ready to settle",
        state: inspecting ? "waiting" : "current",
    };
};

export const payoutSteps = (payout: Payout, now = new Date()): PayoutStep[] => {
    const inspection = inspectionStep(payout, now);

    return [
        {
            id: "escrow",
            label: "Funds placed in escrow",
            detail: `${formatAge(payout.ageMinutes)} ago`,
            state: "done",
        },
        inspection,
        releaseStep(payout, inspection.state === "current"),
    ];
};
