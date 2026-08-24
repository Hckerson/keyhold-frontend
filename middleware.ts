import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JwtPayload } from "@/lib/types/auth";

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

const isTokenExpired = (exp: number): boolean => {
    return Math.floor(Date.now() / 1000) > exp;
};

const getPortalForRole = (role: string): string => {
    const portalMap: Record<string, string> = {
        ADMIN: "/admin",
        BUYER: "/dashboard",
        SELLER: "/agent",
    };
    return portalMap[role] || "/";
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("access_token")?.value;

    const isProtectedRoute = ["/admin", "/agent", "/dashboard"].some((route) =>
        pathname.startsWith(route),
    );
    const isAuthRoute = ["/login", "/signup"].includes(pathname);

    if (!token) {
        if (isProtectedRoute) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    const decoded = decodeJwt(token);

    if (!decoded || isTokenExpired(decoded.exp)) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("access_token");
        return response;
    }

    if (isAuthRoute) {
        return NextResponse.redirect(
            new URL(getPortalForRole(decoded.role), request.url),
        );
    }

    if (isProtectedRoute) {
        let allowedRole: string | null = null;
        if (pathname.startsWith("/admin")) allowedRole = "ADMIN";
        else if (pathname.startsWith("/agent")) allowedRole = "SELLER";
        else if (pathname.startsWith("/dashboard")) allowedRole = "BUYER";

        if (allowedRole && decoded.role !== allowedRole) {
            return NextResponse.redirect(
                new URL(getPortalForRole(decoded.role), request.url),
            );
        }
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
