import { differenceInMonths, format } from "date-fns";
import {
    recencyTone,
    USER_ROLES,
    USER_STATUSES,
} from "@/lib/config/user-tones";
import { dealsLabel, idleDays, joinedLabel } from "@/lib/data/admin-users";
import { formatCompactUsd, parseLocalDate } from "@/lib/utils";
import { toLedgerTransaction } from "@/lib/utils/to-ledger-transaction";
import type {
    ManagedUser,
    ProfileCheck,
    ProfileDetail,
    ProfileNotice,
    ProfileRecordCell,
} from "@/lib/types";
import type { Suspension } from "@/lib/validations/suspension";
import type { SettlementTransaction } from "@/lib/validations/transaction";
import type { User } from "@/lib/validations/user";

const MONTHS_PER_YEAR = 12;
const NOT_ON_FILE = "Not on file";
const NO_DEALS = "No deals closed yet";
const SEEN_FORMAT = "MMM d";

export const SUSPENSION_DATE_FORMAT = "MMM d, yyyy";

export const PROFILE_BACK = { label: "Back to users", href: "/admin/users" };

export const PROFILE_COPY = {
    deals: "Deals",
    dealsLede: "Every deal this account is on, as buyer or agent",
    dealsEmpty: "No deals on record yet",
    activity: "Recent activity",
    activityLede: "What this account has done most recently",
    activityEmpty: "Nothing recorded yet",
    trust: "Verification",
    about: "About",
    restrictions: "Restrictions",
    neverSuspended: "Never suspended",
    suspendedUnrecorded: "Suspended, with no reason on record",
    lifted: "Lifted",
    active: "Active",
    indefinite: "Indefinite",
    days: "days",
    missing: "Not provided",
    email: "Email",
    suspend: "Suspend",
    reactivate: "Reactivate",
} as const;

export const profileChecks = (user: User): ProfileCheck[] => [
    {
        id: "email",
        label: "Email",
        value: user.email ?? NOT_ON_FILE,
        verified: Boolean(user.emailVerified),
    },
    {
        id: "phone",
        label: "Phone",
        value: user.phoneNumber ?? NOT_ON_FILE,
        verified: Boolean(user.phoneVerified),
    },
    {
        id: "identity",
        label: "Identity",
        value: "Government-issued ID",
        verified: Boolean(user.kycVerified),
    },
];

const tenureLabel = (user: ManagedUser, now: Date) => {
    const months = differenceInMonths(now, parseLocalDate(user.joinDate));
    if (months < 1) return "New this month";
    if (months < MONTHS_PER_YEAR) return `${months} mo on the platform`;
    return `${Math.floor(months / MONTHS_PER_YEAR)} yr ${months % MONTHS_PER_YEAR} mo on the platform`;
};

export const profileRecord = (
    user: ManagedUser,
    now = new Date(),
): ProfileRecordCell[] => {
    const days = idleDays(user);

    return [
        {
            id: "volume",
            label: "Lifetime volume",
            value: formatCompactUsd(user.volume),
            caption:
                user.transactions > 0
                    ? `${dealsLabel(user.transactions)} closed`
                    : NO_DEALS,
            tone: user.volume > 0 ? undefined : "neutral",
        },
        {
            id: "joined",
            label: "Member since",
            value: joinedLabel(user),
            caption: tenureLabel(user, now),
        },
        {
            id: "seen",
            label: "Last seen",
            value: days === 0 ? "Today" : `${days}d ago`,
            caption: `Signed in ${format(parseLocalDate(user.lastActive), SEEN_FORMAT)}`,
            tone: recencyTone(days),
        },
    ];
};

export const profileDetails = (user: User): ProfileDetail[] =>
    [
        { id: "jobTitle", label: "Title", value: user.jobTitle },
        { id: "agencyName", label: "Agency", value: user.agencyName },
        { id: "licenseNumber", label: "Licence", value: user.licenseNumber },
    ].filter((detail) => Boolean(detail.value));

export const identityLine = (user: User, managed: ManagedUser) =>
    [USER_ROLES[managed.role].label, user.agencyName, user.email]
        .filter(Boolean)
        .join(" · ");

export const userDeals = (
    transactions: SettlementTransaction[],
    userId: string,
) =>
    transactions
        .filter(
            (transaction) =>
                transaction.buyerId === userId ||
                transaction.sellerId === userId,
        )
        .map(toLedgerTransaction);

export const rankSuspensions = (suspensions: Suspension[]) =>
    [...suspensions].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

export const statusNotice = (
    user: ManagedUser,
    suspensions: Suspension[],
): ProfileNotice | null => {
    if (user.status === "active") return null;
    const meta = USER_STATUSES[user.status];
    const live = suspensions.find((suspension) => !suspension.liftedAt);

    return {
        tone: meta.noteTone,
        title: meta.noteTitle,
        description:
            user.status === "suspended" && live ? live.reason : meta.note,
    };
};
