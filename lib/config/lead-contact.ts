export interface LeadEmailDraft {
    subject: string;
    body: string;
}

export const EMPTY_LEAD_EMAIL_DRAFT: LeadEmailDraft = {
    subject: "",
    body: "",
};

export const LEAD_EMAIL_COPY = {
    title: "Email this enquiry",
    hint: "Sent from the platform. Replies land in your own inbox.",
    subject: "Subject",
    subjectPlaceholder: "About your enquiry",
    body: "Message",
    bodyPlaceholder: "Write a short, direct note…",
    cancel: "Cancel",
    submit: "Send email",
    suppressed: "Email is not configured",
    suppressedLede:
        "The message was recorded against this lead but no email left the platform.",
} as const;

export const LEAD_CALL_COPY = {
    unconfigured: "Calling is not available on this environment",
    ringing: "Calling you now — pick up to be connected",
    title: "Call this lead",
    warning: {
        title: "Your phone rings first",
        body: "The platform calls the number on your profile, then connects you to the lead once you pick up.",
    },
    failure: {
        title: "The call was not placed",
        body: "Check that you and the lead both have a phone number on file, then try again.",
    },
    cancel: "Not now",
    confirm: "Place call",
} as const;

export const EMAIL_NOT_DELIVERED =
    "The email was recorded but the provider did not accept it.";

export const draftFrom = (
    propertyTitle: string | undefined,
): LeadEmailDraft => ({
    subject: propertyTitle ? `About ${propertyTitle}` : "",
    body: "",
});
