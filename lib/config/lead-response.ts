export const LEAD_DECLINE_COPY = {
    title: "Decline this enquiry",
    warning: {
        title: "Declining is final",
        body: "The buyer is told you declined and the enquiry leaves your lead desk. It cannot be reopened from here.",
    },
    failure: {
        title: "The enquiry was not declined",
        body: "It is still on your lead desk. Try again in a moment.",
    },
    cancel: "Keep it",
    confirm: "Decline enquiry",
} as const;
