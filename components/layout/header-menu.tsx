"use client";

import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import type { SiteNavLink } from "@/lib/config/site-nav";
import styles from "@/components/layout/header.module.css";

interface HeaderMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    links: SiteNavLink[];
    signedIn: boolean;
    onLogout: () => void;
}

export function HeaderMenu({
    open,
    onOpenChange,
    links,
    signedIn,
    onLogout,
}: HeaderMenuProps) {
    const close = () => onOpenChange(false);

    return (
        <>
            <button
                type="button"
                onClick={() => onOpenChange(true)}
                aria-expanded={open}
                aria-label="Open menu"
                className={styles.menuTrigger}
            >
                <Menu size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <Drawer
                open={open}
                onOpenChange={onOpenChange}
                label="Site menu"
                size="sm"
            >
                <DrawerHeader>
                    <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>

                <DrawerBody className="flex flex-col gap-1 px-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={close}
                            className="text-text hover:bg-background-alt hover:text-accent focus-visible:ring-accent ease-smooth flex items-center justify-between gap-3 rounded-md px-2.5 py-2.5 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                        >
                            {link.label}
                            <ArrowUpRight
                                size={13}
                                strokeWidth={1.5}
                                className="text-text-muted shrink-0"
                            />
                        </Link>
                    ))}
                </DrawerBody>

                <DrawerFooter className="flex-col items-stretch gap-2">
                    {signedIn ? (
                        <button
                            type="button"
                            onClick={() => {
                                close();
                                onLogout();
                            }}
                            className="border-border-dark text-text hover:border-accent hover:text-accent focus-visible:ring-accent ease-smooth h-9 rounded-full border text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                        >
                            Log out
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={close}
                                className="border-border-dark text-text hover:border-accent hover:text-accent focus-visible:ring-accent ease-smooth grid h-9 place-items-center rounded-full border text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                onClick={close}
                                className="bg-accent text-text-inverse hover:bg-accent-dark focus-visible:ring-accent ease-smooth grid h-9 place-items-center rounded-full text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </DrawerFooter>
            </Drawer>
        </>
    );
}

HeaderMenu.displayName = "HeaderMenu";
