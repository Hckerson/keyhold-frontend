import { Skeleton } from "@/components/ui/skeleton";
import { AccountMatrixRow } from "@/components/features/admin/account-matrix-row";
import { ACCOUNT_COLUMNS } from "@/lib/data/admin-overview-people";
import type { AccountMatrixRow as AccountMatrixRowData } from "@/lib/types";

const TITLE = "Accounts";
const TOTAL_LABEL = "Total";
const TABLE_CAPTION = "Accounts by role and status";

export interface AccountMatrixProps {
    rows: AccountMatrixRowData[];
    coverage: string;
    pending?: boolean;
}

export function AccountMatrix({ rows, coverage, pending }: AccountMatrixProps) {
    return (
        <section
            aria-label={TABLE_CAPTION}
            aria-busy={pending || undefined}
            className="border-border bg-background flex flex-col overflow-hidden rounded-xl border shadow-sm"
        >
            <div className="scroll-x px-3">
                <table className="table-flush w-full min-w-xs table-fixed">
                    <caption className="sr-only">{TABLE_CAPTION}</caption>
                    <thead>
                        <tr className="border-border-light h-9 border-b">
                            <th scope="col" className="micro-label text-left">
                                {TITLE}
                            </th>
                            {ACCOUNT_COLUMNS.map((column) => (
                                <th
                                    key={column.id}
                                    scope="col"
                                    className="micro-label w-20 pl-3 text-right"
                                >
                                    {column.label}
                                </th>
                            ))}
                            <th
                                scope="col"
                                className="micro-label w-16 pl-3 text-right"
                            >
                                {TOTAL_LABEL}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pending ? (
                            <tr>
                                <td
                                    colSpan={ACCOUNT_COLUMNS.length + 2}
                                    className="py-2"
                                >
                                    <Skeleton className="h-24 w-full" />
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <AccountMatrixRow key={row.id} row={row} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <p className="border-border-light text-text-secondary flex h-9 items-center border-t px-3 text-xs">
                {coverage}
            </p>
        </section>
    );
}

AccountMatrix.displayName = "AccountMatrix";
