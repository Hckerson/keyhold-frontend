"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Sidebar, type SidebarProps } from "@/components/layout/sidebar";
import { Topbar, type TopbarProps } from "@/components/layout/topbar";
import { useSession } from "@/lib/hooks/use-session";
import { useSignOut } from "@/lib/hooks/use-sign-out";
import { routesFrom } from "@/lib/utils/nav";

export interface PortalShellProps
    extends
        Pick<SidebarProps, "brand" | "sections" | "status">,
        Pick<TopbarProps, "rootLabel" | "rootHref"> {
    children: ReactNode;
}

export function PortalShell({
    brand,
    sections,
    status,
    rootLabel,
    rootHref,
    children,
}: PortalShellProps) {
    const pathname = usePathname();
    const { user } = useSession();
    const signOut = useSignOut();
    const [navOpen, setNavOpen] = useState(false);

    const routes = useMemo(() => routesFrom(sections), [sections]);

    useEffect(() => setNavOpen(false), [pathname]);

    const handleLogout = () => void signOut();

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
                    onLogout={handleLogout}
                />

                <div className="py-4 md:py-6">
                    <Container className="gutter-x gutter-x--tight">
                        <div className="console-canvas w-full min-w-0">
                            {children}
                        </div>
                    </Container>
                </div>
            </main>
        </div>
    );
}

PortalShell.displayName = "PortalShell";
