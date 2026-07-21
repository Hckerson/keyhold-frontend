import Link from "next/link";
import { SectionShell } from "@/components/sections/section-shell";
import { Wordmark } from "@/components/ui/wordmark";

interface FooterColumn {
    title: string;
    links: { label: string; href: string }[];
}

const COLUMNS: FooterColumn[] = [
    {
        title: "Properties",
        links: [
            { label: "Browse", href: "/search" },
            { label: "Luxury Listings", href: "/search?type=luxury" },
            { label: "New Listings", href: "/search?new=true" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "/contact" },
        ],
    },
];

const SOCIALS = ["Twitter", "LinkedIn", "Instagram"];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-sidebar">
            <SectionShell className="py-14 md:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
                    <div className="col-span-2 space-y-4">
                        <Wordmark tone="dark" />
                        <p className="text-sidebar-text max-w-xs text-sm leading-relaxed">
                            A private marketplace for exceptional homes and the
                            people who love them.
                        </p>
                    </div>

                    {COLUMNS.map((column) => (
                        <nav key={column.title} className="space-y-3">
                            <p className="text-sidebar-text-active text-caption font-mono tracking-wide uppercase">
                                {column.title}
                            </p>
                            <ul className="space-y-2">
                                {column.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sidebar-text hover:text-sidebar-text-active ease-smooth text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <div className="border-sidebar-border mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                    <p className="text-sidebar-text text-sm">
                        © {currentYear} Luxury Real Estate. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {SOCIALS.map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-sidebar-text hover:text-sidebar-text-active ease-smooth text-sm transition-colors"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </SectionShell>
        </footer>
    );
}
