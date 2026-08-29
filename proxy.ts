import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
    ACCESS_TOKEN_COOKIE,
    AUTH_ROUTES,
    PORTAL_BY_ROLE,
    loginWithRedirect,
    portalForRole,
} from "@/lib/constants";
import type { JwtPayload } from "@/lib/types/auth";

type PortalRole = keyof typeof PORTAL_BY_ROLE;

const PORTAL_ENTRIES = Object.entries(PORTAL_BY_ROLE) as [PortalRole, string][];

const AUTH_PATHS: string[] = [AUTH_ROUTES.login, AUTH_ROUTES.signup];

const decodeJwt = (token: string): JwtPayload | null => {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const decoded = JSON.parse(
            Buffer.from(parts[1], "base64url").toString("utf-8"),
        );
        return decoded as JwtPayload;
    } catch {
        return null;
    }
};

const isTokenExpired = (exp: number): boolean =>
    Math.floor(Date.now() / 1000) > exp;

const portalFor = (pathname: string) =>
    PORTAL_ENTRIES.find(([, prefix]) => pathname.startsWith(prefix));

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const portal = portalFor(pathname);
    const isAuthRoute = AUTH_PATHS.includes(pathname);

    const toLogin = () =>
        NextResponse.redirect(
            new URL(loginWithRedirect(pathname), request.url),
        );

    if (!token) {
        if (portal) return toLogin();
        return NextResponse.next();
    }

    const decoded = decodeJwt(token);

    if (!decoded || isTokenExpired(decoded.exp)) {
        const response = portal
            ? toLogin()
            : NextResponse.redirect(new URL(AUTH_ROUTES.login, request.url));
        response.cookies.delete(ACCESS_TOKEN_COOKIE);
        return response;
    }

    const home = portalForRole(decoded.role as PortalRole);

    if (isAuthRoute) {
        return NextResponse.redirect(new URL(home, request.url));
    }

    if (portal && portal[0] !== decoded.role) {
        return NextResponse.redirect(new URL(home, request.url));
    }

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
