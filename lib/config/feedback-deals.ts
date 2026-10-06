import type { MutationFeedback } from "@/lib/config/feedback";

export const DEAL_FEEDBACK = {
    createConnection: {
        success: "Enquiry sent",
        error: "We couldn't send your enquiry.",
    },
    recordLead: { success: "Lead recorded", silentError: true },
    acceptConnection: {
        success: "Enquiry accepted",
        error: "We couldn't accept that enquiry.",
    },
    declineConnection: { success: "Enquiry declined", silentError: true },

    createOffer: { success: "Offer submitted", silentError: true },
    respondToOffer: { success: "Response sent", silentError: true },
    updateMilestone: {
        success: "Milestone updated",
        error: "We couldn't update that milestone.",
    },
    attachMilestoneDocument: {
        success: "Document attached",
        error: "We couldn't attach that document.",
    },
    acceptCounter: { success: "Counter accepted", silentError: true },

    requestViewing: { success: "Viewing requested", silentError: true },
    confirmViewing: {
        success: "Viewing confirmed",
        error: "We couldn't confirm the viewing.",
    },
    rescheduleViewing: {
        success: "Viewing rescheduled",
        error: "We couldn't reschedule the viewing.",
    },
    cancelViewing: { silentError: true },
    declineViewing: { success: "Viewing request declined", silentError: true },

    sendMessage: { error: "Your message wasn't sent." },
    attachMessageFiles: {
        error: "Your message was sent, but its attachments weren't. Attach them again.",
    },

    sendLeadEmail: {
        success: "Email sent",
        error: "We couldn't send that email.",
    },
    startLeadCall: {
        success: "Calling you now — pick up to be connected",
        error: "We couldn't place that call.",
    },

    createDispute: {
        success: "Dispute opened",
        error: "We couldn't open the dispute.",
    },
    addDisputeEvidence: {
        success: "Evidence added",
        error: "We couldn't add that evidence.",
    },
    settleDispute: { success: "Dispute settled", silentError: true },

    releaseEscrow: { success: "Funds released", silentError: true },
    refundEscrow: { success: "Refund issued", silentError: true },

    createTransaction: { silentError: true },
    confirmPayment: { silentError: true },

    createReview: {
        success: "Review submitted",
        error: "We couldn't submit your review.",
    },
} as const satisfies Record<string, MutationFeedback>;
