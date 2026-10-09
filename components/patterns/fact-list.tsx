import { cn } from "@/lib/utils";
import type { Fact } from "@/lib/types";

export interface FactListProps {
    title: string;
    facts: Fact[];
}

export function FactList({ title, facts }: FactListProps) {
    return (
        <section className="min-w-0">
            <h3 className="micro-label">{title}</h3>
            <dl className="divide-border-light mt-1 divide-y">
                {facts.map((fact) => (
                    <div
                        key={fact.label}
                        className="flex items-baseline justify-between gap-4 py-2 text-xs"
                    >
                        <dt className="text-text-muted shrink-0">
                            {fact.label}
                        </dt>
                        <dd
                            className={cn(
                                "min-w-0 truncate text-right tabular-nums",
                                fact.alarm ? "text-error-dark" : "text-text",
                            )}
                        >
                            {fact.href ? (
                                <a
                                    href={fact.href}
                                    className="hover:text-accent ease-smooth transition-colors duration-200"
                                >
                                    {fact.value}
                                </a>
                            ) : (
                                fact.value
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}

FactList.displayName = "FactList";
