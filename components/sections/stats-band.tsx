import { SectionShell } from "@/components/sections/section-shell";
import { cn } from "@/lib/utils";

interface Stat {
    value: string;
    unit?: string;
    label: string;
}

const STATS: Stat[] = [
    { value: "$8.5", unit: "B", label: "In sales closed" },
    { value: "2,500+", label: "Curated listings" },
    { value: "27", label: "Years of practice" },
    { value: "95", unit: "%", label: "Referral rate" },
];

export function StatsBand({ stats = STATS }: { stats?: Stat[] }) {
    return (
        <section className="bg-background border-border relative isolate overflow-hidden border-y py-12 md:py-14">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--color-text)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,#000,transparent)] bg-[size:32px_32px] opacity-[0.04]"
            />

            <SectionShell>
                <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
                    {stats.map((stat, i) => {
                        const focal = i === 0;
                        return (
                            <div
                                key={stat.label}
                                className={cn(
                                    "sm:border-border relative isolate flex flex-col gap-3 px-6 sm:border-l",
                                    focal && "sm:border-l-0 sm:pl-0",
                                )}
                            >
                                {focal && (
                                    <div
                                        aria-hidden="true"
                                        className="bg-highlight/20 pointer-events-none absolute -top-4 -left-6 -z-10 h-20 w-48 rounded-full blur-3xl"
                                    />
                                )}
                                <dt className="text-text-muted order-2 font-mono text-[10px] tracking-[0.16em] uppercase">
                                    {stat.label}
                                </dt>
                                <dd
                                    className={cn(
                                        "font-display text-text order-1 m-0 leading-none font-light tracking-tight tabular-nums",
                                        focal ? "text-h4" : "text-h5",
                                    )}
                                >
                                    {stat.value}
                                    {stat.unit && (
                                        <span className="text-highlight italic">
                                            {stat.unit}
                                        </span>
                                    )}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            </SectionShell>
        </section>
    );
}
