import type { BulkTransition } from "@/lib/types";

export const BULK_STATUS_ACTIONS = ["publish", "draft"] as const;

export type BulkStatusAction = (typeof BULK_STATUS_ACTIONS)[number];

export const BULK_ACTIONS = [...BULK_STATUS_ACTIONS, "delete"] as const;

export type BulkAction = (typeof BULK_ACTIONS)[number];

export const BULK_LABELS: Record<BulkAction, string> = {
    publish: "Publish",
    draft: "Move to Draft",
    delete: "Delete",
};

export const BULK_TRANSITIONS: Record<BulkStatusAction, BulkTransition> = {
    publish: { from: ["draft"], to: "AVAILABLE" },
    draft: { from: ["active"], to: "DRAFT" },
};

export const BULK_PREVIEW = 5;

export const BULK_DELETE_COPY = {
    title: "Delete these listings",
    warning: {
        title: "This cannot be undone",
        body: "Each listing and its photography are removed for everyone.",
    },
    failure: {
        title: "Some listings could not be deleted",
        body: "Listings with live offers or transactions stay on the books. Those still named below were not removed.",
    },
    cancel: "Keep them",
    confirm: "Delete listings",
} as const;

export const BULK_STATUS_CANCEL = "Leave as is";

export const BULK_STATUS_COPY = {
    publish: {
        tone: "accent",
        title: "Publish these listings",
        warning: {
            title: "They go live in search",
            body: "Buyers can find and enquire on each listing the moment it is published.",
        },
        failure: {
            title: "Some listings could not be published",
            body: "Those still named below kept their previous status.",
        },
        confirm: "Publish listings",
    },
    draft: {
        tone: "error",
        title: "Move these listings to draft",
        warning: {
            title: "They come off the market",
            body: "Each listing leaves search and stops taking enquiries until you publish it again.",
        },
        failure: {
            title: "Some listings could not be moved to draft",
            body: "Those still named below kept their previous status.",
        },
        confirm: "Move to draft",
    },
} as const satisfies Record<BulkStatusAction, object>;

const listingNoun = (count: number) => (count === 1 ? "listing" : "listings");

export const bulkDeleteSubject = (count: number) =>
    `${count} selected ${listingNoun(count)}`;

export const bulkChangeSubject = (count: number) =>
    `${count} ${listingNoun(count)} will change`;

export const bulkSkippedNote = (count: number) =>
    count > 0
        ? `${count} selected ${listingNoun(count)} skipped because ${count === 1 ? "its" : "their"} status does not allow this`
        : undefined;

export const bulkOverflow = (count: number) =>
    count > BULK_PREVIEW ? `and ${count - BULK_PREVIEW} more` : undefined;
