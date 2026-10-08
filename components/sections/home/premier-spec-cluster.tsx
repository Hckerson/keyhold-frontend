import type { PremierSpec } from "@/lib/types";

export function PremierSpecCluster({ specs }: { specs: PremierSpec[] }) {
    return (
        <div className="bg-background-muted/60 border-border-light flex flex-wrap gap-x-8 gap-y-3 rounded-md border p-3">
            {specs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-2">
                    <spec.icon
                        size={12}
                        strokeWidth={1.5}
                        className="text-accent shrink-0"
                    />
                    <span className="text-text text-xs font-semibold tabular-nums">
                        {spec.value}
                    </span>
                    <span className="text-text-muted font-mono text-[10px] tracking-[0.12em] uppercase">
                        {spec.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

PremierSpecCluster.displayName = "PremierSpecCluster";
