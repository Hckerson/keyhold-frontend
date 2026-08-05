import { Button } from "@/components/ui/button";

const USERS_TITLE = "User Management";
const USERS_LEDE =
    "Who is on the platform, who is carrying the volume, and which accounts are waiting on a decision";
const ADD_ACTION = "Add User";

export interface AdminUsersHeaderProps {
    summary: string;
}

export function AdminUsersHeader({ summary }: AdminUsersHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {USERS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {USERS_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Button type="button" variant="primary" size="sm">
                    {ADD_ACTION}
                </Button>
            </div>
        </header>
    );
}

AdminUsersHeader.displayName = "AdminUsersHeader";
