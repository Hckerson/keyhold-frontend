import { CircleCheck, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProfileCheck } from "@/lib/types";

const VERIFIED = "Verified";
const MISSING = "Not verified";

export interface UserTrustListProps {
    checks: ProfileCheck[];
}

export function UserTrustList({ checks }: UserTrustListProps) {
    return (
        <ul className="divide-border-light divide-y">
            {checks.map((check) => {
                const Icon = check.verified ? CircleCheck : CircleDashed;

                return (
                    <li
                        key={check.id}
                        className="flex h-11 items-center gap-3 text-xs"
                    >
                        <Icon
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className={cn(
                                "size-3.5 shrink-0",
                                check.verified
                                    ? "text-success"
                                    : "text-warning",
                            )}
                        />
                        <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-text font-medium">
                                {check.label}
                            </span>
                            <span className="text-text-muted truncate">
                                {check.value}
                            </span>
                        </span>
                        <span
                            className={cn(
                                "shrink-0",
                                check.verified
                                    ? "text-text-secondary"
                                    : "text-warning",
                            )}
                        >
                            {check.verified ? VERIFIED : MISSING}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

UserTrustList.displayName = "UserTrustList";
