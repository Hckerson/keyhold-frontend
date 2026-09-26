import type {
    CheckState,
    ComplianceReport,
    ModerationListing,
    ModerationStatus,
    ModerationTarget,
} from "@/lib/types/moderation";
import type { Flag, FlagPropertyTarget } from "@/lib/validations/flag";
import { minutesSince } from "@/lib/utils/elapsed";

const GOOD_PHOTO_COUNT = 5;
const THIN_PHOTO_COUNT = 1;
const GOOD_DESCRIPTION_LENGTH = 200;
const THIN_DESCRIPTION_LENGTH = 40;

const photoCheck = (target: FlagPropertyTarget): CheckState => {
    if (target.images.length >= GOOD_PHOTO_COUNT) return "pass";
    if (target.images.length > THIN_PHOTO_COUNT) return "warn";
    return "fail";
};

const accuracyCheck = (target: FlagPropertyTarget): CheckState => {
    const detailed = target.description.length >= GOOD_DESCRIPTION_LENGTH;
    if (detailed && target.sqFt) return "pass";
    if (target.description.length >= THIN_DESCRIPTION_LENGTH) return "warn";
    return "fail";
};

const licenceCheck = (target: FlagPropertyTarget): CheckState => {
    if (target.sellerLicensed && target.sellerVerified) return "pass";
    if (target.sellerLicensed || target.sellerVerified) return "warn";
    return "fail";
};

const complianceOf = (target: FlagPropertyTarget): ComplianceReport => ({
    photos: photoCheck(target),
    accuracy: accuracyCheck(target),
    licence: licenceCheck(target),
});

const statusOf = (flag: Flag, target: FlagPropertyTarget): ModerationStatus => {
    if (flag.status === "ACTIVE") return "flagged";
    if (target.status === "DRAFT") return "changes";
    if (target.status === "EXPIRED") return "rejected";
    if (flag.status === "DISMISSED") return "approved";
    return "approved";
};

export const isPropertyFlag = (
    flag: Flag,
): flag is Flag & { target: FlagPropertyTarget } =>
    flag.target?.kind === "PROPERTY";

export const toModerationListing = (
    flag: Flag & { target: FlagPropertyTarget },
    reports: number,
): ModerationListing => ({
    id: flag.id,
    listingId: flag.target.id,
    title: flag.target.title,
    address: flag.target.address,
    locality: flag.target.locality,
    price: flag.target.price,
    status: statusOf(flag, flag.target),
    queuedMinutes: minutesSince(flag.createdAt),
    description: flag.reason,
    photos: flag.target.images,
    compliance: complianceOf(flag.target),
    reports,
    agent: {
        name: flag.target.sellerName,
        email: flag.target.sellerEmail,
        phone: flag.target.sellerPhone,
    },
    note: flag.details ?? undefined,
});

export const toModerationQueue = (flags: Flag[]): ModerationListing[] => {
    const propertyFlags = flags.filter(isPropertyFlag);
    const reportsById = propertyFlags.reduce<Record<string, number>>(
        (counts, flag) => ({
            ...counts,
            [flag.target.id]: (counts[flag.target.id] ?? 0) + 1,
        }),
        {},
    );

    return propertyFlags.map((flag) =>
        toModerationListing(flag, reportsById[flag.target.id] ?? 1),
    );
};

export const toModerationTargets = (
    listings: ModerationListing[],
): ModerationTarget[] =>
    listings.map(({ id, listingId }) => ({ flagId: id, listingId }));
