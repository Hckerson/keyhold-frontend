import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/layout/wordmark";
import { propertyImage } from "@/lib/data/sample-images";

const CANVAS_IMAGE = propertyImage(7);

const LEGAL = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
];

function CanvasBackdrop() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
            <img
                src={CANVAS_IMAGE}
                alt=""
                className="size-full object-cover opacity-35"
            />
            <div className="from-sidebar via-sidebar/85 to-sidebar/60 absolute inset-0 bg-linear-to-t" />
            <div className="bg-highlight/20 absolute -top-24 -left-16 h-96 w-96 rounded-full blur-[120px]" />
            <div className="bg-accent/25 absolute -right-24 -bottom-32 h-120 w-120 rounded-full blur-[140px]" />
            <div className="absolute inset-0 bg-[radial-gradient(var(--color-text-inverse)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,#000,transparent)] bg-[size:32px_32px] opacity-[0.05]" />
        </div>
    );
}

export function JoinCanvas({ children }: { children: ReactNode }) {
    return (
        <div className="bg-sidebar relative isolate flex min-h-screen flex-col">
            <CanvasBackdrop />

            <header className="flex items-center justify-between px-6 py-6 md:px-10">
                <Wordmark tone="dark" />
                <Link
                    href="/"
                    className="text-sidebar-text hover:text-text-inverse focus-visible:ring-highlight ease-smooth inline-flex items-center gap-1.5 text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <ArrowLeft size={12} strokeWidth={1.5} />
                    Back to site
                </Link>
            </header>

            <main className="flex flex-1 justify-center px-6 py-8 md:px-10">
                <div className="my-auto w-full">{children}</div>
            </main>

            <footer className="text-sidebar-text-muted flex flex-wrap items-center justify-between gap-3 px-6 py-6 font-mono text-[10px] tracking-[0.14em] uppercase md:px-10">
                <span>Discretion assured · By invitation and application</span>
                <nav className="flex items-center gap-5">
                    {LEGAL.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-text-inverse ease-smooth transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </footer>
        </div>
    );
}

JoinCanvas.displayName = "JoinCanvas";
