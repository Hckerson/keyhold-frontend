import Link from "next/link";
import { SectionShell } from "@/components/patterns/section-shell";
import { FooterLocalityIndex } from "@/components/layout/footer-locality-index";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Wordmark } from "@/components/brand/wordmark";
import { BRAND_NAME } from "@/lib/constants";
import { FOOTER_COLUMNS } from "@/lib/config/site-nav";
import styles from "@/components/layout/footer.module.css";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.grain} aria-hidden="true" />

            <SectionShell>
                <FooterLocalityIndex />

                <div className="relative z-10 mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {FOOTER_COLUMNS.map((column) => (
                        <nav
                            key={column.heading}
                            aria-label={column.heading}
                            className="flex flex-col gap-2.5"
                        >
                            <p className="text-sidebar-text-muted font-mono text-[10px] tracking-[0.14em] uppercase">
                                {column.heading}
                            </p>
                            {column.links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sidebar-text hover:text-sidebar-text-active ease-smooth text-xs transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    ))}
                </div>

                <div className="border-sidebar-border relative z-10 mt-10 flex flex-wrap items-end gap-6 border-t pt-6">
                    <div className="flex flex-col gap-2.5">
                        <Wordmark tone="dark" size="md" />
                        <p className="text-sidebar-text-muted font-mono text-[10px] tracking-[0.14em] tabular-nums">
                            © {currentYear} {BRAND_NAME}
                        </p>
                    </div>
                    <div className={styles.newsletter}>
                        <NewsletterForm />
                    </div>
                </div>
            </SectionShell>
        </footer>
    );
}
