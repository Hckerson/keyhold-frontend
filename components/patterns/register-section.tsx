import { useId, type ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface RegisterSectionProps {
    index: string;
    title: string;
    figure: string;
    figureTone?: ChartTone;
    figureAside?: ReactNode;
    reading: string;
    action?: ReactNode;
    pending?: boolean;
    children: ReactNode;
}

export function RegisterSection({
    index,
    title,
    figure,
    figureTone,
    figureAside,
    reading,
    action,
    pending,
    children,
}: RegisterSectionProps) {
    const headingId = useId();

    return (
        <section
            aria-labelledby={headingId}
            aria-busy={pending || undefined}
            className="register-section"
        >
            <div className="register-spine bg-background-alt flex flex-col gap-3 p-4">
                <div className="flex h-6 items-center justify-between gap-2">
                    <span className="micro-label tabular-nums">{index}</span>
                    {action && <div className="-mr-2 shrink-0">{action}</div>}
                </div>

                <h2
                    id={headingId}
                    className="font-display text-h6 text-text leading-none font-light"
                >
                    {title}
                </h2>

                <div className="flex flex-col gap-1">
                    {pending ? (
                        <Skeleton className="h-8 w-24" />
                    ) : (
                        <div className="flex flex-wrap items-center gap-2">
                            <span
                                className={cn(
                                    "font-display text-h4 leading-none font-light tabular-nums",
                                    figureTone
                                        ? chartToneText[figureTone]
                                        : "text-text",
                                )}
                            >
                                {figure}
                            </span>
                            {figureAside}
                        </div>
                    )}
                    <p className="text-text-secondary text-xs">{reading}</p>
                </div>
            </div>

            <div className="bg-background min-w-0 p-4">{children}</div>
        </section>
    );
}

RegisterSection.displayName = "RegisterSection";
