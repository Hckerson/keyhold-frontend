import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-border bg-background-muted border-t">
            <Container className="py-12 md:py-16">
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-h6 font-body text-text font-semibold">
                            Luxury RE
                        </h3>
                        <p className="text-text-secondary text-sm">
                            Premium real estate marketplace for discerning
                            buyers and luxury agents.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-text letter-spacing-wide text-sm font-semibold uppercase">
                            Properties
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/search"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    Browse
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/search?type=luxury"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    Luxury Listings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/search?new=true"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    New Listings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-text letter-spacing-wide text-sm font-semibold uppercase">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/press"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-text letter-spacing-wide text-sm font-semibold uppercase">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-text-secondary hover:text-text text-sm transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-border flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                    <p className="text-text-muted text-sm">
                        © {currentYear} Luxury Real Estate. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-text-muted hover:text-text transition-colors"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="text-text-muted hover:text-text transition-colors"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="#"
                            className="text-text-muted hover:text-text transition-colors"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
