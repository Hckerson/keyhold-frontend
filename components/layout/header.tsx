"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { useAuthStore } from "@/lib/stores/auth-store";
import { deleteCookie } from "@/lib/utils/cookies";

export function Header() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const handleLogout = () => {
        clearAuth();
        deleteCookie("access_token");
        router.push("/");
    };

    const getPortalHref = () => {
        if (!user) return "/";
        const portalMap: Record<string, string> = {
            ADMIN: "/admin",
            BUYER: "/dashboard",
            SELLER: "/agent",
        };
        return portalMap[user.role] || "/";
    };

    const getUserInitials = () => {
        if (!user) return "";
        return user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="border-border bg-background-alt/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
            <Container className="flex items-center justify-between py-4 md:py-6">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-lg">
                        <span className="text-text-inverse text-sm font-bold">
                            LRE
                        </span>
                    </div>
                    <span className="font-display text-text hidden text-xl font-light sm:inline">
                        Luxury RE
                    </span>
                </Link>

                {!user && (
                    <>
                        <nav className="hidden gap-8 md:flex">
                            <Link
                                href="/search"
                                className="text-text-secondary hover:text-text transition-colors"
                            >
                                Search
                            </Link>
                            <Link
                                href="/about"
                                className="text-text-secondary hover:text-text transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="text-text-secondary hover:text-text transition-colors"
                            >
                                Contact
                            </Link>
                        </nav>

                        <div className="flex gap-4">
                            <Link
                                href="/login"
                                className="bg-background border border-border text-text hover:border-accent hover:text-accent hover:shadow-sm transition-colors h-8 px-3 text-xs rounded-lg font-medium inline-flex items-center justify-center"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-linear-to-b from-accent to-accent-dark text-primary shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 active:opacity-90 h-8 px-3 text-xs rounded-lg font-medium inline-flex items-center justify-center transition-all duration-200 ease-out"
                            >
                                Get Started
                            </Link>
                        </div>
                    </>
                )}

                {user && (
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-text text-sm font-medium">{user.name}</p>
                            <p className="text-text-secondary text-xs capitalize">
                                {user.role.toLowerCase()}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={getPortalHref()}>
                                <button className="bg-accent/20 hover:bg-accent/30 text-accent flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors">
                                    {getUserInitials()}
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-background border border-border text-text hover:border-accent hover:text-accent hover:shadow-sm transition-colors h-8 px-3 text-xs rounded-lg font-medium inline-flex items-center justify-center"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
}
