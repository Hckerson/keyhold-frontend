import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
    ACCESS_TOKEN_COOKIE,
    AUTH_ROUTES,
    PORTAL_BY_ROLE,
    loginWithRedirect,
    portalForRole,
} from "@/lib/constants";
import { verifySessionToken } from "@/lib/utils/verify-session-token";

type PortalRole = keyof typeof PORTAL_BY_ROLE;

const PORTAL_ENTRIES = Object.entries(PORTAL_BY_ROLE) as [PortalRole, string][];

const AUTH_PATHS: string[] = [AUTH_ROUTES.login, AUTH_ROUTES.signup];

const portalFor = (pathname: string) =>
    PORTAL_ENTRIES.find(([, prefix]) => pathname.startsWith(prefix));

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const redirect = (to: string) =>
        NextResponse.redirect(new URL(to, request.url));

    const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const portal = portalFor(pathname);
    const isAuthRoute = AUTH_PATHS.includes(pathname);

    if (!token) {
        return portal
            ? redirect(loginWithRedirect(pathname))
            : NextResponse.next();
    }

    const session = await verifySessionToken(token);

    if (!session) {
        const response = portal
            ? redirect(loginWithRedirect(pathname))
            : NextResponse.next();
        response.cookies.delete(ACCESS_TOKEN_COOKIE);
        return response;
    }

    const home = portalForRole(session.role);

    if (isAuthRoute) return redirect(home);

    if (portal && portal[0] !== session.role) return redirect(home);

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/agent/:path*",
        "/dashboard/:path*",
        "/login",
        "/signup",
    ],
};
