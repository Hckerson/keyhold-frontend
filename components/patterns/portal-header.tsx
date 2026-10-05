import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PortalHeaderBack } from "@/lib/types";

export interface PortalHeaderProps {
    title: string;
    lede?: string;
    summary?: string;
    back?: PortalHeaderBack;
    action?: ReactNode;
}

export function PortalHeader({
    title,
    lede,
    summary,
    back,
    action,
}: PortalHeaderProps) {
    return (
        <header className="flex flex-col gap-2">
            {back && (
                <Link
                    href={back.href}
                    className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth inline-flex w-fit items-center gap-1.5 rounded-xs text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <ArrowLeft size={12} strokeWidth={1.5} aria-hidden="true" />
                    {back.label}
                </Link>
            )}

            <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                    <h1 className="text-h5 font-display text-text font-light">
                        {title}
                    </h1>
                    {lede && (
                        <p className="text-text-secondary mt-0.5 text-xs">
                            {lede}
                        </p>
                    )}
                </div>

                {(summary || action) && (
                    <div className="flex min-w-0 flex-auto items-center justify-end gap-x-6 gap-y-2">
                        {summary && (
                            <p className="micro-label max-w-60 min-w-0 leading-relaxed text-pretty">
                                {summary}
                            </p>
                        )}
                        {action && (
                            <div className="flex shrink-0 items-center gap-2">
                                {action}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

PortalHeader.displayName = "PortalHeader";
