"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { PortalShellSkeleton } from "@/components/layout/portal-shell-skeleton";
import { consoleSkeletonFor } from "@/lib/config/console-skeletons";
import { loginWithRedirect, portalForRole } from "@/lib/constants";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useSession } from "@/lib/hooks/use-session";
import type { UserRole } from "@/lib/types/auth";

interface PortalGuardProps {
    role: UserRole;
    children: ReactNode;
}

export function PortalGuard({ role, children }: PortalGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const mounted = useMounted();
    const { user, isLoading } = useSession();

    const allowed = mounted && user?.role === role;

    useEffect(() => {
        if (!mounted || isLoading || allowed) return;
        router.replace(
            user ? portalForRole(user.role) : loginWithRedirect(pathname),
        );
    }, [allowed, isLoading, mounted, pathname, router, user]);

    if (allowed) return <>{children}</>;

    return (
        <PortalShellSkeleton>
            <ConsoleSkeleton variant={consoleSkeletonFor(pathname)} />
        </PortalShellSkeleton>
    );
}

PortalGuard.displayName = "PortalGuard";
