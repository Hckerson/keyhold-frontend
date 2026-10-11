import { DEAL_FEEDBACK } from "@/lib/config/feedback-deals";
import { LISTING_FEEDBACK } from "@/lib/config/feedback-listings";

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
    ...DEAL_FEEDBACK,
    ...LISTING_FEEDBACK,

    disconnectGoogleCalendar: {
        success: "Google Calendar disconnected",
        silentError: true,
    },
    requestPasswordReset: { silentError: true },
    resetPassword: { silentError: true },
    register: { silentError: true },

    sendPasswordReset: { error: "We couldn't send the reset email." },

    updateNotificationPreferences: {
        error: "We couldn't save your alert preferences.",
    },
    markNotificationRead: { error: "We couldn't mark that alert as read." },
    markAllNotificationsRead: {
        success: "All alerts marked read",
        error: "We couldn't mark your alerts as read.",
    },
    removeNotification: { error: "We couldn't remove that alert." },

    submitKyc: {
        success: "Documents submitted",
        error: "We couldn't submit your documents.",
    },
    reviewKyc: {
        success: "Verification decided",
        error: "We couldn't record the verification decision.",
    },
    rejectKyc: { success: "Verification decided", silentError: true },

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
