import type { DecisionMode, ModerationStatus } from "@/lib/types";

export interface DecisionMeta {
    title: string;
    field: string;
    placeholder: string;
    submit: string;
    status: ModerationStatus;
    destructive: boolean;
}

export const MODERATION_DECISIONS: Record<DecisionMode, DecisionMeta> = {
    changes: {
        title: "Request changes",
        field: "Feedback for the agent",
        placeholder:
            "Describe exactly what the agent must change before this listing can go live.",
        submit: "Send feedback",
        status: "changes",
        destructive: false,
    },
    reject: {
        title: "Reject listing",
        field: "Reason for rejection",
        placeholder:
            "Explain what fails review. This reason is stored with the listing and sent to the agent.",
        submit: "Reject listing",
        status: "rejected",
        destructive: true,
    },
};
