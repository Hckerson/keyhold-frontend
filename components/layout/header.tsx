"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Header() {
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
                    <Button variant="secondary" size="sm">
                        Sign In
                    </Button>
                    <Button variant="primary" size="sm">
                        Get Started
                    </Button>
                </div>
            </Container>
        </header>
    );
}
