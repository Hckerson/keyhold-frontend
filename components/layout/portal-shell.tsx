"use client";

import { useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ConsoleCanvas } from "@/components/layout/console-canvas";
import { Sidebar, type SidebarProps } from "@/components/layout/sidebar";
import { SignOutModal } from "@/components/layout/sign-out-modal";
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
    const { signOut, signingOut, confirmation } = useSignOut();
    const [navOpenedOn, setNavOpenedOn] = useState<string | null>(null);
    const navOpen = navOpenedOn === pathname;

    const routes = useMemo(() => routesFrom(sections), [sections]);

    return (
        <div className="bg-background-alt flex h-screen">
            <Sidebar
                brand={brand}
                sections={sections}
                status={status}
                user={user}
                onLogout={signOut}
                signingOut={signingOut}
                open={navOpen}
                onClose={() => setNavOpenedOn(null)}
            />

            <main className="scroll-page min-w-0 flex-1">
                <Topbar
                    routes={routes}
                    rootLabel={rootLabel}
                    rootHref={rootHref}
                    user={user}
                    onNavOpen={() => setNavOpenedOn(pathname)}
                    onLogout={signOut}
                    signingOut={signingOut}
                />

                <ConsoleCanvas>{children}</ConsoleCanvas>
            </main>

            <SignOutModal confirmation={confirmation} />
        </div>
    );
}

PortalShell.displayName = "PortalShell";
