"use client";

import Link from "next/link";
import type { SiteNavLink } from "@/lib/config/site-nav";
import { holdsRoute } from "@/lib/utils/nav";
import { cn } from "@/lib/utils";
import styles from "@/components/layout/header.module.css";

interface HeaderNavProps {
    links: SiteNavLink[];
    pathname: string;
}

export function HeaderNav({ links, pathname }: HeaderNavProps) {
    return (
        <nav className={styles.nav} aria-label="Primary">
            {links.map((link) => {
                const current = holdsRoute(link.href, pathname);

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                            styles.navLink,
                            current && styles.navLinkActive,
                        )}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}

HeaderNav.displayName = "HeaderNav";
