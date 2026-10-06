import {
    BadgeCheck,
    Building2,
    FileText,
    MapPin,
    Phone,
    ShieldCheck,
} from "lucide-react";
import { signalTone } from "@/lib/config/account-tones";
import type { ProfileSignal, ShareDatum } from "@/lib/types";
import { percentOf, sum } from "@/lib/utils";
import type { User } from "@/lib/validations/user";

export const profileSignals = (
    user: User | undefined,
    listingCount: number,
): ProfileSignal[] => [
    {
        id: "licence",
        icon: BadgeCheck,
        label: "Licence number on file",
        impact: 24,
        complete: Boolean(user?.licenseNumber),
    },
    {
        id: "brokerage",
        icon: Building2,
        label: "Brokerage named",
        impact: 20,
        complete: Boolean(user?.agencyName),
    },
    {
        id: "identity",
        icon: ShieldCheck,
        label: "Identity verified",
        impact: 18,
        complete: Boolean(user?.kycVerified),
    },
    {
        id: "bio",
        icon: FileText,
        label: "Long-form biography",
        impact: 16,
        complete: Boolean(user?.bio),
    },
    {
        id: "contact",
        icon: Phone,
        label: "Phone reachable",
        impact: 12,
        complete: Boolean(user?.phoneNumber),
    },
    {
        id: "listings",
        icon: MapPin,
        label: "Listings published",
        impact: 10,
        complete: listingCount > 0,
    },
];

export const profileStrength = (signals: ProfileSignal[]) =>
    percentOf(
        sum(signals.filter((signal) => signal.complete).map((s) => s.impact)),
        sum(signals.map((signal) => signal.impact)),
    );

export const profileSignalShares = (signals: ProfileSignal[]): ShareDatum[] => {
    const peak = Math.max(...signals.map((signal) => signal.impact));

    return signals.map((signal) => ({
        id: signal.id,
        icon: signal.icon,
        label: signal.label,
        value: `${signal.impact}%`,
        percent: percentOf(signal.impact, peak),
        tone: signalTone(signal.complete),
    }));
};
