import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

export type DealStage =
    | "showing"
    | "offer"
    | "negotiating"
    | "inspection"
    | "closing";

const STAGES: { id: DealStage; label: string }[] = [
    { id: "showing", label: "Showing" },
    { id: "offer", label: "Offer" },
    { id: "negotiating", label: "Negotiating" },
    { id: "inspection", label: "Inspection" },
    { id: "closing", label: "Closing" },
];

const stageTone = {
    showing: "info",
    offer: "warning",
    negotiating: "warning",
    inspection: "warning",
    closing: "success",
} as const;

export interface DealRowProps {
    property: string;
    buyer: string;
    price: number;
    stage: DealStage;
    daysInStage: number;
    nextStep: string;
    className?: string;
}

export function DealRow({
    property,
    buyer,
    price,
    stage,
    daysInStage,
    nextStep,
    className,
}: DealRowProps) {
    const index = STAGES.findIndex((s) => s.id === stage);
    const progress = Math.round(((index + 1) / STAGES.length) * 100);
    const label = STAGES[index]?.label ?? "Unknown";

    return (
        <article
            className={cn(
                "bg-background-muted border-border-light hover:border-border ease-smooth space-y-4 rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md",
                className,
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="text-text truncate text-sm font-medium">
                        {property}
                    </h3>
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {buyer}
                    </p>
                </div>
                <StatusBadge tone={stageTone[stage]} dot>
                    {label}
                </StatusBadge>
            </div>

            <div className="flex items-baseline gap-2">
                <span className="text-h5 font-display text-accent font-light tabular-nums">
                    ${(price / 1_000_000).toFixed(2)}M
                </span>
                <span className="text-text-muted text-xs tabular-nums">
                    {daysInStage} days in stage
                </span>
            </div>

            <div>
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-text-muted text-caption font-medium tracking-wide uppercase">
                        Deal Progress
                    </span>
                    <span className="text-accent text-xs font-medium tabular-nums">
                        {progress}%
                    </span>
                </div>
                <ProgressBar
                    value={progress}
                    tone={stage === "closing" ? "success" : "accent"}
                />
                <div className="mt-2 flex justify-between text-[10px]">
                    {STAGES.map((s, i) => (
                        <span
                            key={s.id}
                            className={cn(
                                i <= index
                                    ? "text-text-secondary font-medium"
                                    : "text-text-muted",
                            )}
                        >
                            {s.label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="border-border-light border-t pt-3 text-sm">
                <span className="text-text-secondary">Next: </span>
                <span className="text-text font-medium">{nextStep}</span>
            </div>

            <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1">
                    Update Status
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                    View Details
                </Button>
            </div>
        </article>
    );
}

DealRow.displayName = "DealRow";
