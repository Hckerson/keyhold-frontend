import { SectionShell } from "@/components/sections/section-shell";
import { cn } from "@/lib/utils";

interface Stat {
    value: string;
    unit?: string;
    label: string;
}

const STATS: Stat[] = [
    { value: "$8.5", unit: "B", label: "In Sales Closed" },
    { value: "2,500+", label: "Curated Listings" },
    { value: "27", label: "Years of Practice" },
    { value: "95", unit: "%", label: "Referral Rate" },
];

export function StatsBand({ stats = STATS }: { stats?: Stat[] }) {
    return (
        <section className="bg-background border-border-light border-y py-16 md:py-18">
            <SectionShell>
                <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={cn(
                                "sm:border-border-light px-6 sm:border-l",
                                i === 0 && "sm:border-l-0 sm:pl-0",
                            )}
                        >
                            <p className="font-display text-text text-h2 leading-none font-light tracking-tight tabular-nums">
                                {stat.value}
                                {stat.unit && (
                                    <span className="text-highlight italic">
                                        {stat.unit}
                                    </span>
                                )}
                            </p>
                            <p className="text-text-muted text-caption mt-4 font-mono tracking-[0.12em] uppercase">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionShell>
        </section>
    );
}
