import type { AuthUser } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";

const DEV_MODE = process.env.NEXT_PUBLIC_BYPASS_AUTH === "true";

export const devLoginAs = (role: "ADMIN" | "BUYER" | "SELLER") => {
    if (!DEV_MODE) {
        console.warn(
            "Dev login only available when NEXT_PUBLIC_BYPASS_AUTH=true",
        );
        return;
    }

    const mockUsers: Record<string, AuthUser> = {
        ADMIN: {
            id: "admin-123",
            name: "Admin User",
            email: "admin@example.com",
            role: "ADMIN",
        },
        BUYER: {
            id: "buyer-456",
            name: "John Buyer",
            email: "buyer@example.com",
            role: "BUYER",
        },
        SELLER: {
            id: "seller-789",
            name: "Jane Seller",
            email: "seller@example.com",
            role: "SELLER",
        },
    };

    const user = mockUsers[role];
    const mockToken = "dev-mock-token";

    useAuthStore.getState().setAuth(user, mockToken);
    setCookie("access_token", mockToken, 7);

    console.log(`✓ Dev login as ${role}:`, user);
};

export const devLogout = () => {
    useAuthStore.getState().clearAuth();
    console.log("✓ Dev logout");
};
