import { StatusBadge } from "@/components/ui/status-badge";
import {
    PROFILE_COPY as COPY,
    SUSPENSION_DATE_FORMAT,
} from "@/lib/data/admin-user-profile";
import type { Suspension } from "@/lib/validations/suspension";
import { dateFormatter } from "@/lib/utils";

export interface UserSuspensionListProps {
    suspensions: Suspension[];
}

export function UserSuspensionList({ suspensions }: UserSuspensionListProps) {
    return (
        <ul className="divide-border divide-y">
            {suspensions.map((suspension) => (
                <li
                    key={suspension.id}
                    className="flex items-start justify-between gap-3 py-2.5"
                >
                    <div className="min-w-0">
                        <p className="text-text truncate text-xs">
                            {suspension.reason}
                        </p>
                        {suspension.notes && (
                            <p className="text-text-secondary mt-0.5 truncate text-xs">
                                {suspension.notes}
                            </p>
                        )}
                        <p className="micro-label mt-0.5 tabular-nums">
                            {dateFormatter(
                                suspension.createdAt,
                                SUSPENSION_DATE_FORMAT,
                            )}
                            {" · "}
                            {suspension.duration
                                ? `${suspension.duration} ${COPY.days}`
                                : COPY.indefinite}
                        </p>
                    </div>
                    <StatusBadge
                        tone={suspension.liftedAt ? "neutral" : "error"}
                    >
                        {suspension.liftedAt ? COPY.lifted : COPY.active}
                    </StatusBadge>
                </li>
            ))}
        </ul>
    );
}

UserSuspensionList.displayName = "UserSuspensionList";
