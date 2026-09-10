export type MutationFeedback = {
    success?: string;
    error?: string;
    silentError?: true;
};

export const GENERIC_FAILURE = "That didn't go through. Try again in a moment.";

export const NETWORK_FAILURE =
    "We can't reach the server. Check your connection and try again.";

export const SESSION_EXPIRED = {
    title: "Your session expired",
    description: "Sign in again to pick up where you left off.",
} as const;

export const FEEDBACK = {
    requestPasswordReset: { silentError: true },
    resetPassword: { silentError: true },
    register: { silentError: true },

    sendPasswordReset: { error: "We couldn't send the reset email." },

    createConnection: {
        success: "Enquiry sent",
        error: "We couldn't send your enquiry.",
    },
    recordLead: { success: "Lead recorded", silentError: true },
    respondToConnection: {
        success: "Response sent",
        error: "We couldn't send your response.",
    },

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
    acceptCounter: {
        success: "Counter accepted",
        error: "We couldn't accept the counter-offer.",
    },

    requestViewing: { success: "Viewing requested", silentError: true },
    confirmViewing: {
        success: "Viewing confirmed",
        error: "We couldn't confirm the viewing.",
    },
    rescheduleViewing: {
        success: "Viewing rescheduled",
        error: "We couldn't reschedule the viewing.",
    },
    cancelViewing: { error: "We couldn't cancel the viewing." },

    sendMessage: { error: "Your message wasn't sent." },

    sendLeadEmail: {
        success: "Email sent",
        error: "We couldn't send that email.",
    },
    startLeadCall: {
        success: "Calling you now — pick up to be connected",
        error: "We couldn't place that call.",
    },

    toggleSavedProperty: { error: "We couldn't update your saved list." },
    createSavedSearch: {
        success: "Search saved",
        error: "We couldn't save that search.",
    },
    updateSavedSearch: {
        success: "Search updated",
        error: "We couldn't update that search.",
    },
    removeSavedSearch: { error: "We couldn't remove that search." },

    updateNotificationPreferences: {
        error: "We couldn't save your alert preferences.",
    },
    markNotificationRead: { error: "We couldn't mark that alert as read." },
    markAllNotificationsRead: {
        success: "All alerts marked read",
        error: "We couldn't mark your alerts as read.",
    },
    removeNotification: { error: "We couldn't remove that alert." },

    createProperty: {
        success: "Listing created",
        error: "We couldn't create the listing.",
    },
    updateProperty: {
        success: "Listing updated",
        error: "We couldn't save your changes.",
    },
    updatePropertyStatus: {
        success: "Listing status updated",
        error: "We couldn't update the listing status.",
    },
    deleteProperty: { error: "We couldn't delete the listing." },
    recordPropertyView: { silentError: true },
    promoteProperty: { success: "Listing promoted", silentError: true },
    markPropertySold: {
        success: "Listing marked sold",
        error: "We couldn't mark the listing sold.",
    },
    uploadPropertyImages: {
        success: "Images uploaded",
        error: "We couldn't upload those images.",
    },
    deletePropertyImage: {
        success: "Photo removed",
        error: "We couldn't remove that photo.",
    },
    reorderPropertyImages: { error: "We couldn't reorder those photos." },
    moderateProperty: {
        success: "Decision recorded",
        error: "We couldn't record your decision.",
    },

    createFlag: {
        success: "Report submitted",
        error: "We couldn't submit your report.",
    },
    settleFlag: { error: "We couldn't settle the flag." },

    submitKyc: {
        success: "Documents submitted",
        error: "We couldn't submit your documents.",
    },
    reviewKyc: {
        success: "Verification decided",
        error: "We couldn't record the verification decision.",
    },

    createDispute: {
        success: "Dispute opened",
        error: "We couldn't open the dispute.",
    },
    addDisputeEvidence: {
        success: "Evidence added",
        error: "We couldn't add that evidence.",
    },
    settleDispute: {
        success: "Dispute settled",
        error: "We couldn't settle the dispute.",
    },

    releaseEscrow: { success: "Funds released", silentError: true },
    refundEscrow: {
        success: "Refund issued",
        error: "We couldn't issue the refund.",
    },

    createTransaction: { silentError: true },
    confirmPayment: { silentError: true },

    createReview: {
        success: "Review submitted",
        error: "We couldn't submit your review.",
    },

    createUser: { success: "Invitation sent", silentError: true },
    updateUser: { error: "We couldn't save your changes." },
    setUserTier: {
        success: "Tier updated",
        error: "We couldn't update the tier.",
    },
    suspendUser: { error: "We couldn't suspend that account." },
    liftSuspension: {
        success: "Suspension lifted",
        error: "We couldn't lift the suspension.",
    },

    verifyEmail: {
        success: "Email confirmed",
        error: "That code was not accepted.",
    },
    resendVerification: {
        success: "A new code is on its way",
        error: "We couldn't send a new code.",
    },
    uploadAvatar: {
        success: "Profile photo updated",
        error: "We couldn't upload that photo.",
    },

    updatePlatformSettings: {
        success: "Settings saved",
        error: "We couldn't save the platform settings.",
    },
    restorePlatformDefaults: {
        success: "Settings restored to defaults",
        error: "We couldn't restore the default settings.",
    },
    purgeExpiredVerifications: {
        success: "Expired verifications purged",
        error: "We couldn't purge the expired verifications.",
    },

    createConciergeClient: {
        success: "Client added",
        error: "We couldn't add that client.",
    },
    updateConciergeClient: {
        success: "Client updated",
        error: "We couldn't update that client.",
    },
    removeConciergeClient: { error: "We couldn't remove that client." },
    saveConciergeService: {
        success: "Service saved",
        error: "We couldn't save that service.",
    },
    saveConciergePractice: {
        success: "Practice saved",
        error: "We couldn't save that practice.",
    },
    coverConciergeClient: {
        success: "Cover assigned",
        error: "We couldn't assign cover.",
    },

    exportPersonalData: { error: "We couldn't prepare your data export." },
} as const satisfies Record<string, MutationFeedback>;
