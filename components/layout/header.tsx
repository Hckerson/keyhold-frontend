"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { useAuthStore } from "@/lib/stores/auth-store";
import { deleteCookie } from "@/lib/utils/cookies";
import { cn } from "@/lib/utils";
import styles from "@/components/layout/header.module.css";

const PORTAL_BY_ROLE: Record<string, string> = {
    ADMIN: "/admin",
    BUYER: "/dashboard",
    SELLER: "/agent",
};

const NAV = [
    { label: "Search", href: "/search" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export function Header() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const [contracted, setContracted] = useState(false);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setContracted(window.scrollY > 40);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const portalHref = user ? PORTAL_BY_ROLE[user.role] || "/" : "/";
    const initials = user
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "";

    const handleLogout = () => {
        clearAuth();
        deleteCookie("access_token");
        router.push("/");
    };

    return (
        <div className={styles.wrap}>
            <header
                className={cn(styles.capsule, contracted && styles.contract)}
            >
                <Link href="/" className={styles.brand} aria-label="Luxury RE">
                    <span className={styles.mark}>
                        <LogoMark size="sm" />
                    </span>
                    <span className={styles.word}>
                        Luxury <em>RE</em>
                    </span>
                </Link>

                <span className={styles.divider} aria-hidden="true" />

                <nav className={styles.nav} aria-label="Primary">
                    {user ? (
                        <>
                            <Link href="/search" className={styles.navLink}>
                                Search
                            </Link>
                            <Link href={portalHref} className={styles.navLink}>
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        NAV.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={styles.navLink}
                            >
                                {item.label}
                            </Link>
                        ))
                    )}
                </nav>

                <span className={styles.divider} aria-hidden="true" />

                <div className={styles.actions}>
                    {user ? (
                        <>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className={styles.signin}
                            >
                                Log out
                            </button>
                            <Link
                                href={portalHref}
                                className={styles.avatar}
                                aria-label="Your portal"
                            >
                                {initials}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={styles.signin}>
                                Sign In
                            </Link>
                            <Link href="/signup" className={styles.pill}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}
