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
    const { isAuthenticated } = useSession();
    const signedIn = mounted && isAuthenticated;

    const requireSignIn = useCallback(() => {
        if (signedIn) return true;
        router.push(loginWithRedirect(pathname));
        return false;
    }, [signedIn, router, pathname]);

    return { mounted, signedIn, requireSignIn };
}
