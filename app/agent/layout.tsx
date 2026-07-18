"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { AGENT_NAV, AGENT_ROUTES } from "@/lib/config/agent-nav";
import { useAuthStore } from "@/lib/stores/auth-store";
import { deleteCookie } from "@/lib/utils/cookies";

export default function AgentLayout({
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
                brand={{ full: "Agent Pro", short: "AP", tagline: "Premium" }}
                sections={AGENT_NAV}
                user={user}
                onLogout={handleLogout}
            />

            <main className="flex-1 overflow-auto">
                <Topbar
                    routes={AGENT_ROUTES}
                    rootLabel="Agent"
                    rootHref="/agent"
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
