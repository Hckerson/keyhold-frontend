"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { HeaderMenu } from "@/components/layout/header-menu";
import { useSession } from "@/lib/hooks/use-session";
import { useSignOut } from "@/lib/hooks/use-sign-out";
import { siteNavFor } from "@/lib/config/site-nav";
import { portalForRole } from "@/lib/constants";
import { cn } from "@/lib/utils";
import styles from "@/components/layout/header.module.css";

export function Header() {
    const { user } = useSession();
    const signOut = useSignOut();
    const [contracted, setContracted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const links = siteNavFor(user?.role);
    const portalHref = user ? portalForRole(user.role) : "/";
    const initials = user
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "";

    const handleLogout = () => void signOut();

    return (
        <div className={cn(styles.wrap, menuOpen && styles.recessed)}>
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
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.navLink}
                        >
                            {link.label}
                        </Link>
                    ))}
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

                    <HeaderMenu
                        open={menuOpen}
                        onOpenChange={setMenuOpen}
                        links={links}
                        signedIn={Boolean(user)}
                        onLogout={handleLogout}
                    />
                </div>
            </header>
        </div>
    );
}
