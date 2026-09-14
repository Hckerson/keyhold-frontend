import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const USERS_TITLE = "User Management";
const USERS_LEDE =
    "Who is on the platform, who is carrying the volume, and which accounts are waiting on a decision";
const ADD_ACTION = "Add User";

export interface AdminUsersHeaderProps {
    summary: string;
    onAdd: () => void;
}

export function AdminUsersHeader({ summary, onAdd }: AdminUsersHeaderProps) {
    return (
        <PortalHeader
            title={USERS_TITLE}
            lede={USERS_LEDE}
            summary={summary}
            action={
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    onClick={onAdd}
                >
                    {ADD_ACTION}
                </Button>
            }
        />
    );
}

AdminUsersHeader.displayName = "AdminUsersHeader";
