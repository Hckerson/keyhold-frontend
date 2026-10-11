import { NO_READING } from "@/lib/constants";
import { formatCount } from "@/lib/utils";
import type { DonutSegment } from "@/lib/types";

const TITLE = "Accounts by role";

export interface RoleTallyProps {
    roles: DonutSegment[];
    unknown?: boolean;
}

export function RoleTally({ roles, unknown }: RoleTallyProps) {
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
                    <dt className="text-text-secondary truncate text-xs">
                        {role.name}
                    </dt>
                    <dd className="text-text text-xs font-semibold tabular-nums">
                        {unknown ? NO_READING : formatCount(role.value)}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

RoleTally.displayName = "RoleTally";
