import { DEAL_ENDPOINTS } from "./api-deals";
import { PLATFORM_ENDPOINTS } from "./api-platform";

export const API_ENDPOINTS = {
    base: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
        onboarding: "/auth/onboarding",
        logout: "/auth/logout",
        verifyEmail: "/auth/verify-email",
        resendVerification: "/auth/resend-verification",
    },
    users: {
        list: "/users",
        me: "/users/me",
        export: "/users/me/export",
        eraseMe: "/users/me",
        detail: (id: string) => `/users/${id}`,
        tierDistribution: "/users/tiers/distribution",
        tier: (id: string) => `/users/${id}/tier`,
        avatar: "/users/me/avatar",
    },
    properties: {
        list: "/properties",
        search: "/properties/search",
        facets: "/properties/facets",
        localities: "/properties/localities",
        detail: (id: string) => `/properties/${id}`,
        nearby: (id: string) => `/properties/${id}/nearby`,
        bySeller: (sellerId: string) => `/properties/seller/${sellerId}`,
        images: (id: string) => `/properties/${id}/images`,
        imageOrder: (id: string) => `/properties/${id}/images/order`,
        image: (id: string, imageId: string) =>
            `/properties/${id}/images/${imageId}`,
        markSold: (id: string) => `/properties/${id}/mark-sold`,
        moderate: (id: string) => `/properties/${id}/moderate`,
        view: (id: string) => `/properties/${id}/view`,
        promote: (id: string) => `/properties/${id}/promote`,
    },
    savedProperties: {
        list: "/saved-properties",
        ids: "/saved-properties/ids",
        entry: (propertyId: string) => `/saved-properties/${propertyId}`,
    },
    connections: {
        create: "/connections",
        myInterests: "/connections/my-interests",
        incoming: "/connections/incoming",
        detail: (id: string) => `/connections/${id}`,
        accept: (id: string) => `/connections/${id}/accept`,
        reject: (id: string) => `/connections/${id}/reject`,
        leads: "/connections/leads",
    },
    messages: {
        create: "/messages",
        attachments: (id: string) => `/messages/${id}/attachments`,
        byConnection: (connectionId: string) =>
            `/messages/connection/${connectionId}`,
        unreadCount: "/messages/unread/count",
    },
    contact: {
        history: (connectionId: string) => `/contact/${connectionId}`,
        email: (connectionId: string) => `/contact/${connectionId}/email`,
        call: (connectionId: string) => `/contact/${connectionId}/call`,
    },
    newsletter: {
        subscribe: "/newsletter/subscribe",
        confirm: "/newsletter/confirm",
        unsubscribe: "/newsletter/unsubscribe",
    },
    viewings: {
        create: "/viewings",
        detail: (id: string) => `/viewings/${id}`,
        byConnection: (connectionId: string) =>
            `/viewings/connection/${connectionId}`,
        confirm: (id: string) => `/viewings/${id}/confirm`,
        reschedule: (id: string) => `/viewings/${id}/reschedule`,
        cancel: (id: string) => `/viewings/${id}/cancel`,
    },
    offers: {
        create: "/offers",
        detail: (id: string) => `/offers/${id}`,
        byConnection: (connectionId: string) =>
            `/offers/connection/${connectionId}`,
        respond: (id: string) => `/offers/${id}/respond`,
        acceptCounter: (id: string) => `/offers/${id}/accept-counter`,
        milestones: (id: string) => `/offers/${id}/milestones`,
        milestone: (id: string, kind: string) =>
            `/offers/${id}/milestones/${kind}`,
        milestoneDocument: (id: string, kind: string) =>
            `/offers/${id}/milestones/${kind}/document`,
    },
    ...DEAL_ENDPOINTS,
    ...PLATFORM_ENDPOINTS,
};
