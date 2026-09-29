import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import { chartToneVar } from "@/lib/config/chart-tones";
import { formatCount } from "@/lib/utils";

const TITLE = "Accounts by role";

export interface RoleTallyProps {
    roles: DonutSegment[];
}

export function RoleTally({ roles }: RoleTallyProps) {
    return (
        <dl
            aria-label={TITLE}
            className="bg-background-muted divide-border-light grid auto-cols-fr grid-flow-col divide-x rounded-lg"
        >
            {roles.map((role) => (
                <div
                    key={role.name}
                    className="flex min-w-0 flex-col gap-1 p-3"
                >
                    <dt className="text-text-secondary flex min-w-0 items-center gap-1.5 text-xs">
                        <span
                            aria-hidden="true"
                            className="size-2 shrink-0 rounded-xs"
                            style={{ background: chartToneVar[role.tone] }}
                        />
                        <span className="truncate">{role.name}</span>
                    </dt>
                    <dd className="text-text text-xs font-semibold tabular-nums">
                        {formatCount(role.value)}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

RoleTally.displayName = "RoleTally";
