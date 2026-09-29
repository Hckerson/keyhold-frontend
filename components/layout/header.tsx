"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { HeaderMenu } from "@/components/layout/header-menu";
import { HeaderNav } from "@/components/layout/header-nav";
import { SignOutModal } from "@/components/layout/sign-out-modal";
import { useSession } from "@/lib/hooks/use-session";
import { useSignOut } from "@/lib/hooks/use-sign-out";
import { siteNavFor } from "@/lib/config/site-nav";
import { portalForRole } from "@/lib/constants";
import { cn, initialsOf } from "@/lib/utils";
import styles from "@/components/layout/header.module.css";

export function Header() {
    const { user } = useSession();
    const { signOut, signingOut, confirmation } = useSignOut();
    const pathname = usePathname();
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

    return (
        <div className={cn(styles.wrap, menuOpen && styles.recessed)}>
            <header
                className={cn(styles.capsule, contracted && styles.contract)}
            >
                <div className={styles.side}>
                    <Link
                        href="/"
                        className={styles.brand}
                        aria-label="Luxury RE"
                    >
                        <span className={styles.mark}>
                            <LogoMark size="sm" />
                        </span>
                        <span className={styles.word}>
                            Luxury <em>RE</em>
                        </span>
                    </Link>
                    <span className={styles.divider} aria-hidden="true" />
                </div>

                <HeaderNav links={links} pathname={pathname} />

                <div className={cn(styles.side, styles.sideEnd)}>
                    <span className={styles.divider} aria-hidden="true" />

                    <div className={styles.actions}>
                        {user ? (
                            <>
                                <button
                                    type="button"
                                    onClick={signOut}
                                    disabled={signingOut}
                                    aria-busy={signingOut}
                                    className={styles.signin}
                                >
                                    Log out
                                </button>
                                <Link
                                    href={portalForRole(user.role)}
                                    className={styles.avatar}
                                    aria-label="Your portal"
                                >
                                    {initialsOf(user.name)}
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
                            pathname={pathname}
                            signedIn={Boolean(user)}
                            onLogout={signOut}
                            signingOut={signingOut}
                        />
                    </div>
                </div>
            </header>

            <SignOutModal confirmation={confirmation} />
        </div>
    );
}
