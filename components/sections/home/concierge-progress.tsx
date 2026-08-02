import type { ConciergeStep } from "@/lib/data/home-concierge";
import { cn } from "@/lib/utils";

export function ConciergeProgress({
    steps,
    activeIdx,
}: {
    steps: ConciergeStep[];
    activeIdx: number;
}) {
    return (
        <div
            aria-hidden="true"
            className="hidden gap-x-4 lg:grid lg:grid-cols-[auto_1fr]"
        >
            <span className="bg-border relative w-px">
                <span
                    className="bg-accent ease-smooth absolute inset-x-0 top-0 transition-transform duration-500"
                    style={{
                        height: `${100 / steps.length}%`,
                        transform: `translateY(${activeIdx * 100}%)`,
                    }}
                />
            </span>

            <ul className="flex flex-col">
                {steps.map((step, index) => (
                    <li
                        key={step.idx}
                        className={cn(
                            "ease-smooth py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-500",
                            index === activeIdx
                                ? "text-text"
                                : "text-text-muted",
                        )}
                    >
                        {step.idx} · {step.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

ConciergeProgress.displayName = "ConciergeProgress";
