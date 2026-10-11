import { FLAG_STATES } from "@/lib/config/flag-tones";
import { USER_STATUSES } from "@/lib/config/user-tones";
import { FLAG_COPY, flagClock, subjectOf } from "@/lib/data/admin-flags";
import { decidedOn } from "@/lib/data/review-queue";
import { formatFullDate, mailHref } from "@/lib/utils";
import { MANAGED_STATUS_BY_ACCOUNT } from "@/lib/utils/to-managed-user";
import type {
    Fact,
    FlagReport,
    ReportedMember,
    ReviewOutcomeView,
} from "@/lib/types";

const emailFact = (email: string): Fact => ({
    label: "Email",
    value: email,
    href: mailHref(email),
});

export const paneTitle = (report: FlagReport) =>
    report.target?.kind === "MESSAGE"
        ? FLAG_COPY.messageHeading
        : subjectOf(report);

export const reportedLine = (report: FlagReport) =>
    `Reported ${formatFullDate(new Date(report.openedAt))}`;

export const memberFacts = (member: ReportedMember): Fact[] => [
    emailFact(member.email),
    {
        label: "Account",
        value: USER_STATUSES[MANAGED_STATUS_BY_ACCOUNT[member.status]].label,
    },
];

export const reporterFacts = (report: FlagReport): Fact[] => [
    { label: "Member", value: report.reporter },
    ...(report.reporterEmail ? [emailFact(report.reporterEmail)] : []),
    { label: "Reported", value: formatFullDate(new Date(report.openedAt)) },
];

export const flagOutcome = (report: FlagReport): ReviewOutcomeView => ({
    tone: FLAG_STATES[report.status].tone,
    label: FLAG_STATES[report.status].label,
    date: decidedOn(flagClock(report)),
    noteHeading: FLAG_COPY.wordsHeading,
    note: null,
});
