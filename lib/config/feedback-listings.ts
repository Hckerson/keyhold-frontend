import type { MutationFeedback } from "@/lib/config/feedback";

export const LISTING_FEEDBACK = {
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
} as const satisfies Record<string, MutationFeedback>;
