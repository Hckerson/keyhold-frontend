"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loginWithRedirect } from "@/lib/constants";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useSession } from "@/lib/hooks/use-session";

export function useSignInGate() {
    const router = useRouter();
    const pathname = usePathname();
    const mounted = useMounted();
    const { isAuthenticated, isLoading } = useSession();
    const signedIn = mounted && isAuthenticated;
    const resolving = !mounted || isLoading;

    const requireSignIn = useCallback(() => {
        if (signedIn) return true;
        if (resolving) return false;
        router.push(loginWithRedirect(pathname));
        return false;
    }, [signedIn, resolving, router, pathname]);

    return { mounted, signedIn, resolving, requireSignIn };
}
