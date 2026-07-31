import Link from "next/link";
import {
    ArrowRight,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    type LucideIcon,
} from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { FooterLocalityIndex } from "@/components/layout/footer-locality-index";
import { Wordmark } from "@/components/brand/wordmark";
import styles from "@/components/layout/footer.module.css";

interface LinkColumn {
    heading: string;
    links: { label: string; href: string }[];
}

const LINK_COLUMNS: LinkColumn[] = [
    {
        heading: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        heading: "Support",
        links: [
            { label: "Help", href: "/help" },
            { label: "Search listings", href: "/search" },
            { label: "Create an account", href: "/signup" },
        ],
    },
    {
        heading: "Legal",
        links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Accessibility", href: "/accessibility" },
        ],
    },
];

const SOCIALS: { label: string; href: string; icon: LucideIcon }[] = [
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Facebook", href: "https://facebook.com", icon: Facebook },
    { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.grain} aria-hidden="true" />

            <SectionShell>
                <div className="relative z-10">
                    <p className={styles.eyebrow}>The Concierge</p>
                    <h2 className={styles.statement}>
                        A home worthy of the <em>life you&apos;ve built.</em>
                    </h2>
                    <div className={styles.ctaRow}>
                        <Link href="/search" className={styles.cta}>
                            Begin your search
                            <ArrowRight size={18} strokeWidth={1.5} />
                        </Link>
                        <span className={styles.call}>
                            or call <b>+1 310 555 0100</b>
                        </span>
                    </div>
                </div>

                <FooterLocalityIndex />

                <div className="relative z-10 mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.6fr]">
                    {LINK_COLUMNS.map((column) => (
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

                    <div className="border-sidebar-border bg-sidebar-hover rounded-lg border p-4">
                        <NewsletterForm />
                    </div>
                </div>

                <div className="border-sidebar-border relative z-10 mt-10 flex flex-wrap items-end justify-between gap-6 border-t pt-6">
                    <div className="flex flex-col gap-2.5">
                        <Wordmark tone="dark" size="md" />
                        <p className="text-sidebar-text-muted font-mono text-[10px] tracking-[0.14em] tabular-nums">
                            © {currentYear} Luxury RE
                        </p>
                    </div>

                    <ul className="flex items-center gap-2">
                        {SOCIALS.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="border-sidebar-border text-sidebar-text hover:text-highlight hover:border-highlight focus-visible:ring-highlight ease-smooth grid size-8 place-items-center rounded-full border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                                >
                                    <social.icon size={14} strokeWidth={1.5} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </SectionShell>
        </footer>
    );
}
