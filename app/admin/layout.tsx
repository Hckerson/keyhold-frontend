"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { ADMIN_NAV, ADMIN_ROUTES } from "@/lib/config/admin-nav";
import { useAuthStore } from "@/lib/stores/auth-store";
import { deleteCookie } from "@/lib/utils/cookies";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const handleLogout = () => {
        clearAuth();
        deleteCookie("access_token");
        router.push("/");
    };

    return (
        <div className="bg-background-alt flex h-screen">
            <Sidebar
                brand={{ full: "Admin", tagline: "Console" }}
                sections={ADMIN_NAV}
                user={user}
                onLogout={handleLogout}
            />

            <main className="flex-1 overflow-auto">
                <Topbar
                    routes={ADMIN_ROUTES}
                    rootLabel="Admin"
                    rootHref="/admin"
                    user={user}
                />

                <div className="py-6">
                    <Container>
                        <div className="w-full min-w-0">{children}</div>
                    </Container>
                </div>
            </main>
        </div>
    );
}
