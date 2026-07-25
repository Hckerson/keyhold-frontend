import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/sections/section-shell";
import { Wordmark } from "@/components/ui/wordmark";
import styles from "@/components/layout/footer.module.css";

const NEIGHBORHOODS = [
    "Beverly Hills",
    "Malibu",
    "Bel Air",
    "Pacific Heights",
    "Santa Monica",
    "Holmby Hills",
    "Brentwood",
    "Hidden Hills",
];

const LINKS = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
];

function MarqueeRow() {
    return (
        <>
            {NEIGHBORHOODS.map((name) => (
                <Fragment key={name}>
                    <span className={styles.item}>{name}</span>
                    <span className={styles.dot} aria-hidden="true">
                        ·
                    </span>
                </Fragment>
            ))}
        </>
    );
}

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
            </SectionShell>

            <div
                className={`${styles.marquee} relative z-10`}
                aria-hidden="true"
            >
                <div className={styles.track}>
                    <MarqueeRow />
                    <MarqueeRow />
                </div>
            </div>

            <SectionShell>
                <div className={`${styles.bottom} relative z-10`}>
                    <Wordmark tone="dark" />
                    <nav className={styles.links}>
                        {LINKS.map((link) => (
                            <Link key={link.href} href={link.href}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <span className={styles.copy}>
                        © {currentYear} Luxury RE
                    </span>
                </div>
            </SectionShell>
        </footer>
    );
}
