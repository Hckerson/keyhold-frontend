"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ConsoleCanvas } from "@/components/layout/console-canvas";
import { Sidebar, type SidebarProps } from "@/components/layout/sidebar";
import { SignOutModal } from "@/components/layout/sign-out-modal";
import { SkipLink } from "@/components/layout/skip-link";
import { Topbar, type TopbarProps } from "@/components/layout/topbar";
import { useSession } from "@/lib/hooks/use-session";
import { useSignOut } from "@/lib/hooks/use-sign-out";
import { routesFrom } from "@/lib/utils/nav";
import { MAIN_CONTENT_ID } from "@/lib/constants";

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
    const navToggleRef = useRef<HTMLButtonElement>(null);
    const closeNav = () => setNavOpenedOn(null);

    const routes = useMemo(() => routesFrom(sections), [sections]);

    return (
        <div className="bg-background-alt flex h-screen">
            <SkipLink />
            <Sidebar
                brand={brand}
                sections={sections}
                status={status}
                user={user}
                onLogout={() => {
                    closeNav();
                    signOut();
                }}
                signingOut={signingOut}
                open={navOpen}
                onClose={closeNav}
                finalFocus={() => !confirmation.open && navToggleRef.current}
            />

            <main id={MAIN_CONTENT_ID} className="scroll-page min-w-0 flex-1">
                <Topbar
                    routes={routes}
                    rootLabel={rootLabel}
                    rootHref={rootHref}
                    user={user}
                    navOpen={navOpen}
                    navToggleRef={navToggleRef}
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
