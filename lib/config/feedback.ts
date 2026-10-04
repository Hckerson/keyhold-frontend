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
    disconnectGoogleCalendar: {
        success: "Google Calendar disconnected",
        silentError: true,
    },
    requestPasswordReset: { silentError: true },
    resetPassword: { silentError: true },
    register: { silentError: true },

    sendPasswordReset: { error: "We couldn't send the reset email." },

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
    bulkUpdatePropertyStatus: {
        success: "Listings updated",
        silentError: true,
    },
    deleteProperty: { silentError: true },
    bulkDeleteProperties: { success: "Listings deleted", silentError: true },
    recordPropertyView: { silentError: true },
    promoteProperty: { success: "Listing promoted", silentError: true },
    markPropertySold: { success: "Listing marked sold", silentError: true },
    uploadPropertyImages: {
        success: "Images uploaded",
        error: "We couldn't upload those images.",
    },
    deletePropertyImage: { success: "Photo removed", silentError: true },
    reorderPropertyImages: { error: "We couldn't reorder those photos." },

    createFlag: {
        success: "Report submitted",
        error: "We couldn't submit your report.",
    },
    settleFlag: { silentError: true },
    approveFlaggedListing: {
        success: "Listing approved",
        error: "We couldn't approve the listing.",
    },
    decideFlaggedListing: { success: "Decision recorded", silentError: true },

    submitKyc: {
        success: "Documents submitted",
        error: "We couldn't submit your documents.",
    },
    reviewKyc: {
        success: "Verification decided",
        error: "We couldn't record the verification decision.",
    },
    rejectKyc: { success: "Verification decided", silentError: true },

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

    createUser: { success: "Account created", silentError: true },
    updateUser: { error: "We couldn't save your changes." },
    setUserTier: {
        success: "Tier updated",
        error: "We couldn't update the tier.",
    },
    suspendUser: { silentError: true },
    liftSuspension: {
        success: "Suspension lifted",
        error: "We couldn't lift the suspension.",
    },

    signOut: { error: "We couldn't sign you out. Try again." },
    subscribeNewsletter: { silentError: true },
    confirmNewsletter: { silentError: true },
    unsubscribeNewsletter: { silentError: true },
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
        silentError: true,
    },
    purgeExpiredVerifications: {
        success: "Expired verifications purged",
        silentError: true,
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
