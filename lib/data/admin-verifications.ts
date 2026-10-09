import { VERIFICATION_STATES } from "@/lib/config/verification-tones";
import {
    byReviewOrder,
    decidedOn,
    openFor,
    reviewMoment,
    reviewReading,
} from "@/lib/data/review-queue";
import { formatFullDate, mailHref, telHref } from "@/lib/utils";
import type {
    Fact,
    ReviewClock,
    ReviewOutcomeView,
    ReviewQueueItem,
    VerificationFilterKey,
    VerificationRequest,
} from "@/lib/types";

const ALL: VerificationFilterKey = "all";
const READING = { open: "waiting", none: "Nothing is waiting for review" };

export const VERIFICATION_COPY = {
    title: "Identity Verifications",
    lede: "Match each applicant's document to their selfie before they can list or buy",
    documentHeading: "Document",
    applicantHeading: "Applicant",
    documentFrame: "Document image",
    faceFrame: "Selfie",
    noFace: "No selfie submitted",
    noFaceHint: "Nothing to hold the document photo against",
    openFull: "Open full size",
    profile: "Open profile",
    reasonHeading: "Reason given",
    emptyTitle: "Queue clear",
    emptyLede: "No identity documents match this view.",
} as const;

const clockOf = (request: VerificationRequest): ReviewClock => ({
    open: request.status === "PENDING",
    openedAt: request.submittedAt,
    decidedAt: request.decidedAt,
});

export const verificationCounts = (items: VerificationRequest[]) => {
    const counts: Record<VerificationFilterKey, number> = {
        all: items.length,
        PENDING: 0,
        VERIFIED: 0,
        REJECTED: 0,
    };
    for (const item of items) counts[item.status] += 1;
    return counts;
};

export const verificationsIn = (
    items: VerificationRequest[],
    filter: VerificationFilterKey,
) =>
    items
        .filter((item) => filter === ALL || item.status === filter)
        .sort((a, b) => byReviewOrder(clockOf(a), clockOf(b)));

export const verificationReading = (
    items: VerificationRequest[],
    now = new Date(),
) => reviewReading(items.map(clockOf), READING, now);

export const verificationQueueItems = (
    requests: VerificationRequest[],
    mixed: boolean,
    now = new Date(),
): ReviewQueueItem[] =>
    requests.map((request) => ({
        id: request.id,
        title: request.name,
        caption: [request.documentType, request.role]
            .filter(Boolean)
            .join(" · "),
        moment: reviewMoment(clockOf(request), now),
        status:
            mixed && request.status !== "PENDING"
                ? VERIFICATION_STATES[request.status]
                : undefined,
    }));

export const waitingLine = (request: VerificationRequest, now = new Date()) =>
    `Waiting ${openFor(clockOf(request), now)}`;

export const verificationOutcome = (
    request: VerificationRequest,
): ReviewOutcomeView => ({
    ...VERIFICATION_STATES[request.status],
    date: decidedOn(clockOf(request)),
    noteHeading: VERIFICATION_COPY.reasonHeading,
    note: request.reason,
});

export const applicantLine = (request: VerificationRequest) =>
    [request.role, request.agency].filter(Boolean).join(" · ");

const expiryFact = (expiresAt: string, now: Date): Fact => {
    const expired = new Date(expiresAt).getTime() < now.getTime();
    return {
        label: expired ? "Expired" : "Valid until",
        value: formatFullDate(new Date(expiresAt)),
        alarm: expired,
    };
};

export const documentFacts = (
    request: VerificationRequest,
    now = new Date(),
): Fact[] => [
    { label: "Type", value: request.documentType },
    { label: "Number", value: request.documentNumber, mono: true },
    { label: "Issued by", value: request.issuer },
    ...(request.expiresAt ? [expiryFact(request.expiresAt, now)] : []),
    {
        label: "Submitted",
        value: formatFullDate(new Date(request.submittedAt)),
    },
];

export const applicantFacts = (request: VerificationRequest): Fact[] => [
    ...(request.licence
        ? [{ label: "Licence", value: request.licence, mono: true }]
        : []),
    {
        label: "Member since",
        value: formatFullDate(new Date(request.memberSince)),
    },
    { label: "Email", value: request.email, href: mailHref(request.email) },
    ...(request.phone
        ? [
              {
                  label: "Phone",
                  value: request.phone,
                  href: telHref(request.phone),
              },
          ]
        : []),
];
