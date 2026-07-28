"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/patterns/data-table";
import {
    buildUserColumns,
    userStatusMeta,
} from "@/components/features/admin/user-table-columns";
import type { ManagedUser, UserStatus } from "@/lib/types";

export interface UserTableProps {
    users: ManagedUser[];
    onStatusChange?: (ids: string[], status: UserStatus) => void;
    pageSize?: number;
    className?: string;
}

const DEFAULT_PAGE_SIZE = 10;

export function UserTable({
    users,
    onStatusChange,
    pageSize = DEFAULT_PAGE_SIZE,
    className,
}: UserTableProps) {
    const columns = useMemo(
        () => buildUserColumns(onStatusChange),
        [onStatusChange],
    );

    return (
        <DataTable
            columns={columns}
            data={users}
            rowKey={(row) => row.id}
            rowClassName={(row) => userStatusMeta[row.status].rowTone}
            caption="Platform users with role, tier, join date, deal count and account status"
            emptyMessage="No users to show"
            defaultSort={{ id: "user", direction: "asc" }}
            selectable
            pageSize={pageSize}
            bulkActions={(rows) => (
                <>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                            onStatusChange?.(
                                rows.map((row) => row.id),
                                "active",
                            )
                        }
                    >
                        Reactivate
                    </Button>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                            onStatusChange?.(
                                rows.map((row) => row.id),
                                "suspended",
                            )
                        }
                    >
                        Suspend
                    </Button>
                </>
            )}
            className={className}
        />
    );
}

UserTable.displayName = "UserTable";
