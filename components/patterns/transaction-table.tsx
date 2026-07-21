import { Eye, Activity, type LucideIcon } from "lucide-react";
import {
    StatusBadge,
    type StatusBadgeProps,
} from "@/components/ui/status-badge";
import {
    DataTable,
    type DataTableColumn,
} from "@/components/patterns/data-table";
import { cn } from "@/lib/utils";

/* --------------------------------- Types --------------------------------- */

type Tone = NonNullable<StatusBadgeProps["tone"]>;

export type TransactionStatus = "pending" | "escrow" | "completed" | "failed";

export interface Transaction {
    id: string;
    property: string;
    buyer: string;
    agent: string;
    price: number;
    status: TransactionStatus;
    initiatedDate: string;
}

export interface TransactionTableProps {
    transactions: Transaction[];
    commissionRate?: number;
    className?: string;
}

export const DEFAULT_COMMISSION_RATE = 0.025;

const statusMeta: Record<
    TransactionStatus,
    {
        tone: Tone;
        label: string;
        dateTone: string;
        settled: boolean;
        rowTone?: string;
    }
> = {
    pending: {
        tone: "info",
        label: "Pending",
        dateTone: "text-info",
        settled: false,
    },
    escrow: {
        tone: "warning",
        label: "Escrow",
        dateTone: "text-warning",
        settled: false,
    },
    completed: {
        tone: "success",
        label: "Completed",
        dateTone: "text-text-muted",
        settled: true,
    },
    failed: {
        tone: "error",
        label: "Failed",
        dateTone: "text-error",
        settled: true,
        rowTone: "bg-error/[0.035]",
    },
};

const toMillions = (value: number) => `$${(value / 1_000_000).toFixed(2)}M`;
const toThousands = (value: number) => `$${Math.round(value / 1000)}K`;
const sumPrice = (rows: Transaction[]) =>
    rows.reduce((total, row) => total + row.price, 0);

/* --------------------------------- Cells --------------------------------- */

function IconButton({
    label,
    icon: Icon,
}: {
    label: string;
    icon: LucideIcon;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className="text-text-muted hover:text-accent hover:border-border focus-visible:ring-accent ease-smooth grid size-6 place-items-center rounded-full border border-transparent transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            <Icon size={12} strokeWidth={1.5} />
        </button>
    );
}

function PropertyCell({ transaction }: { transaction: Transaction }) {
    return (
        <div className="min-w-0">
            <p className="text-text truncate text-sm font-medium">
                {transaction.property}
            </p>
            <p className="text-text-muted mt-0.5 truncate text-xs">
                {transaction.buyer}
                <span className="text-text-muted/60 px-1">→</span>
                {transaction.agent}
            </p>
        </div>
    );
}

function RowActions({ transaction }: { transaction: Transaction }) {
    return (
        <div className="flex items-center justify-end gap-1">
            <IconButton label="View transaction" icon={Eye} />
            {!statusMeta[transaction.status].settled && (
                <IconButton label="Monitor escrow" icon={Activity} />
            )}
        </div>
    );
}

/* -------------------------------- Columns -------------------------------- */

function buildColumns(commissionRate: number): DataTableColumn<Transaction>[] {
    return [
        {
            id: "property",
            label: "Property",
            render: (row) => <PropertyCell transaction={row} />,
            footer: () => (
                <span className="text-text-muted text-caption font-mono font-medium tracking-wide uppercase">
                    Total
                </span>
            ),
        },
        {
            id: "price",
            label: "Sale Price",
            align: "right",
            render: (row) => (
                <span className="font-display text-text text-lg leading-none font-light tabular-nums">
                    {toMillions(row.price)}
                </span>
            ),
            footer: (rows) => (
                <span className="text-text text-sm font-medium tabular-nums">
                    {toMillions(sumPrice(rows))}
                </span>
            ),
        },
        {
            id: "commission",
            label: "Commission",
            align: "right",
            render: (row) => (
                <span className="bg-accent/8 text-accent inline-flex rounded-md px-2 py-0.5 text-xs font-medium tabular-nums">
                    {toThousands(row.price * commissionRate)}
                </span>
            ),
            footer: (rows) => (
                <span className="text-accent text-sm font-medium tabular-nums">
                    {toThousands(sumPrice(rows) * commissionRate)}
                </span>
            ),
        },
        {
            id: "initiated",
            label: "Initiated",
            render: (row) => (
                <span
                    className={cn(
                        "text-xs whitespace-nowrap tabular-nums",
                        statusMeta[row.status].dateTone,
                    )}
                >
                    {row.initiatedDate}
                </span>
            ),
        },
        {
            id: "status",
            label: "Status",
            render: (row) => (
                <StatusBadge tone={statusMeta[row.status].tone}>
                    {statusMeta[row.status].label}
                </StatusBadge>
            ),
        },
        {
            id: "actions",
            label: "Actions",
            align: "right",
            srOnlyLabel: true,
            render: (row) => <RowActions transaction={row} />,
        },
    ];
}

/* --------------------------------- Table --------------------------------- */

export function TransactionTable({
    transactions,
    commissionRate = DEFAULT_COMMISSION_RATE,
    className,
}: TransactionTableProps) {
    return (
        <DataTable
            columns={buildColumns(commissionRate)}
            data={transactions}
            rowKey={(row) => row.id}
            rowClassName={(row) => statusMeta[row.status].rowTone}
            caption="Marketplace transactions with sale price, commission, initiation date and status"
            emptyMessage="No transactions to show"
            className={className}
        />
    );
}

TransactionTable.displayName = "TransactionTable";
