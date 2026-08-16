"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Sidebar, type SidebarProps } from "@/components/layout/sidebar";
import { Topbar, type TopbarProps } from "@/components/layout/topbar";
import { useSession } from "@/lib/hooks/use-session";

export interface PortalShellProps
    extends
        Pick<SidebarProps, "brand" | "sections" | "status">,
        Pick<TopbarProps, "routes" | "rootLabel" | "rootHref"> {
    children: ReactNode;
}

export function PortalShell({
    brand,
    sections,
    status,
    routes,
    rootLabel,
    rootHref,
    children,
}: PortalShellProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useSession();
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => setNavOpen(false), [pathname]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <div className="bg-background-alt flex h-screen">
            <Sidebar
                brand={brand}
                sections={sections}
                status={status}
                user={user}
                onLogout={handleLogout}
                open={navOpen}
                onClose={() => setNavOpen(false)}
            />

            <main className="scroll-page min-w-0 flex-1">
                <Topbar
                    routes={routes}
                    rootLabel={rootLabel}
                    rootHref={rootHref}
                    user={user}
                    onNavOpen={() => setNavOpen(true)}
                />

                <div className="py-4 md:py-6">
                    <Container className="px-4 md:px-12">
                        <div className="w-full min-w-0">{children}</div>
                    </Container>
                </div>
            </main>
        </div>
    );
}

PortalShell.displayName = "PortalShell";
