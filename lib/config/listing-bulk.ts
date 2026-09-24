import type { BulkAction } from "@/lib/data/agent-listings";
import type { PropertyStatus } from "@/lib/enums/enums";

export const BULK_STATUS: Record<
    Exclude<BulkAction, "delete">,
    PropertyStatus
> = {
    publish: "AVAILABLE",
    draft: "DRAFT",
    renew: "AVAILABLE",
};

export const BULK_DELETE_PREVIEW = 5;

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

export const bulkDeleteSubject = (count: number) =>
    `${count} selected ${count === 1 ? "listing" : "listings"}`;

export const bulkDeleteOverflow = (count: number) =>
    count > BULK_DELETE_PREVIEW
        ? `and ${count - BULK_DELETE_PREVIEW} more`
        : undefined;
