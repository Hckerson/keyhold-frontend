export type SettleMode = "release" | "refund";

export interface SettleModeMeta {
    title: string;
    lede: string;
    submit: string;
    tone: "accent" | "error";
    failure: {
        title: string;
        body: string;
    };
    reason?: {
        label: string;
        hint: string;
        placeholder: string;
    };
}

export const SETTLE_MODES: Record<SettleMode, SettleModeMeta> = {
    release: {
        title: "Release this hold",
        lede: "The seller is paid the net amount immediately and the sale settles. Releasing cannot be undone.",
        submit: "Release funds",
        tone: "accent",
        failure: {
            title: "The funds could not be released",
            body: "Nothing has moved and the hold is still in escrow. Try again in a moment.",
        },
    },
    refund: {
        title: "Refund this hold",
        lede: "The buyer is repaid in full and the sale does not settle. Refunding cannot be undone.",
        submit: "Refund buyer",
        tone: "error",
        failure: {
            title: "The refund could not be issued",
            body: "Nothing has moved and the hold is still in escrow. Try again in a moment.",
        },
        reason: {
            label: "Reason for the refund",
            hint: "Required. Both parties see this on the transaction.",
            placeholder: "Inspection failed and the buyer withdrew.",
        },
    },
};

export const SETTLE_TRIGGER_LABEL = "Settle";
export const SETTLE_ACTION_LABEL = "Settle the hold for";
export const SETTLE_WARNING_TITLE = "This cannot be undone";
