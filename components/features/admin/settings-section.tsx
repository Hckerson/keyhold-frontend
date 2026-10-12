import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SettingsSectionProps {
    id: string;
    title: string;
    lede: string;
    meta?: string;
    flush?: boolean;
    children: ReactNode;
}

export function SettingsSection({
    id,
    title,
    lede,
    meta,
    flush,
    children,
}: SettingsSectionProps) {
    const titleId = `${id}-title`;

    return (
        <section
            id={id}
            aria-labelledby={titleId}
            className="grid scroll-mt-6 gap-x-10 gap-y-3 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        >
            <div className="min-w-0">
                <h2 id={titleId} className="text-text text-sm">
                    {title}
                </h2>
                <p className="text-text-secondary mt-1 text-xs leading-relaxed text-pretty">
                    {lede}
                </p>
                {meta && <p className="micro-label mt-3">{meta}</p>}
            </div>
            <div
                className={cn(
                    "bg-background border-border min-w-0 rounded-xl border shadow-sm",
                    flush ? "overflow-hidden" : "p-4",
                )}
            >
                {children}
            </div>
        </section>
    );
}

SettingsSection.displayName = "SettingsSection";
