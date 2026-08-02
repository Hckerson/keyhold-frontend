import { checkMeta, type ComplianceCheck } from "@/lib/data/admin-listings";
import { cn } from "@/lib/utils";

export function ComplianceList({ checks }: { checks: ComplianceCheck[] }) {
    return (
        <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {checks.map((check) => {
                const meta = checkMeta[check.state];
                const Icon = meta.icon;
                return (
                    <li
                        key={check.label}
                        className={cn(
                            "flex items-center gap-1 text-xs",
                            meta.cls,
                        )}
                    >
                        <Icon
                            size={12}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="shrink-0"
                        />
                        {check.label}
                    </li>
                );
            })}
        </ul>
    );
}
