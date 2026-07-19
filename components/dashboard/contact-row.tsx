import type { ReactNode } from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export type BadgeTone = "neutral" | "success" | "warning" | "error" | "info";

export interface ContactField {
    label: string;
    value: ReactNode;
}

export interface ContactRowData {
    name: string;
    subtitle: string;
    badge: { label: string; tone: BadgeTone };
    fields: ContactField[];
    nextAction: string;
}

export interface ContactRowProps {
    contact: ContactRowData;
    actions: ReactNode;
    className?: string;
}

export function ContactRow({ contact, actions, className }: ContactRowProps) {
    const { name, subtitle, badge, fields, nextAction } = contact;
    return (
        <article
            className={cn(
                "bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-start sm:justify-between",
                className,
            )}
        >
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-text truncate text-sm font-medium">
                            {name}
                        </h3>
                        <p className="text-text-secondary mt-0.5 truncate text-xs">
                            {subtitle}
                        </p>
                    </div>
                    <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
                </div>

                <div className="border-border-light mt-4 grid gap-4 border-t pt-4 sm:grid-cols-3">
                    {fields.map((field) => (
                        <div key={field.label} className="min-w-0">
                            <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                                {field.label}
                            </p>
                            <div className="text-text mt-1 text-sm font-medium">
                                {field.value}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-4 text-sm">
                    <span className="text-text-secondary">Next: </span>
                    <span className="text-text font-medium">{nextAction}</span>
                </p>
            </div>

            <div className="flex shrink-0 gap-2 sm:flex-col">{actions}</div>
        </article>
    );
}

ContactRow.displayName = "ContactRow";
