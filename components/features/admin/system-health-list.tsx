import { StatusDot } from "@/components/patterns/status-dot";
import { systemState, type SystemHealth } from "@/lib/data/admin-overview";
import { cn } from "@/lib/utils";

export function SystemHealthList({ systems }: { systems: SystemHealth[] }) {
    return (
        <ul className="divide-border-light divide-y">
            {systems.map((system) => {
                const state = systemState[system.state];
                return (
                    <li
                        key={system.label}
                        className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                    >
                        <div className="flex min-w-0 items-start gap-2">
                            <system.icon
                                size={12}
                                strokeWidth={1.5}
                                className="text-text-muted mt-0.5 shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="text-text truncate text-xs">
                                    {system.label}
                                </p>
                                <p className="micro-label mt-0.5 tabular-nums">
                                    Uptime {system.uptime} · Err{" "}
                                    {system.errorRate}
                                </p>
                            </div>
                        </div>
                        <span className="flex shrink-0 items-center gap-1.5">
                            <StatusDot tone={state.tone} />
                            <span className={cn("text-xs", state.text)}>
                                {state.label}
                            </span>
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

SystemHealthList.displayName = "SystemHealthList";
