export type LeadResponse = "accept" | "decline";

export interface LeadResponseCopy {
    title: string;
    warning: { title: string; body: string };
    failure: { title: string; body: string };
    cancel: string;
    confirm: string;
    tone: "accent" | "error";
}

export const LEAD_RESPONSE_COPY: Record<LeadResponse, LeadResponseCopy> = {
    accept: {
        title: "Accept this enquiry",
        warning: {
            title: "The buyer is told straight away",
            body: "The buyer is emailed that you accepted and the enquiry moves into your pipeline. It cannot be declined afterwards.",
        },
        failure: {
            title: "The enquiry was not accepted",
            body: "It is still on your lead desk. Try again in a moment.",
        },
        cancel: "Not yet",
        confirm: "Accept enquiry",
        tone: "accent",
    },
    decline: {
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
        tone: "error",
    },
};
