import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const TRANSACTIONS_TITLE = "Transactions";
const TRANSACTIONS_LEDE =
    "Every deal between an accepted offer and a settled commission";
const EXPORT_ACTION = "Export";
const PAYOUTS_ACTION = "Payouts";

export interface AdminTransactionsHeaderProps {
    summary: string;
}

export function AdminTransactionsHeader({
    summary,
}: AdminTransactionsHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {TRANSACTIONS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {TRANSACTIONS_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <div className="flex items-center gap-2">
                    <Button type="button" variant="secondary" size="sm">
                        {EXPORT_ACTION}
                    </Button>
                    <Link
                        href="/admin/payments"
                        className={buttonVariants({
                            variant: "primary",
                            size: "sm",
                        })}
                    >
                        {PAYOUTS_ACTION}
                    </Link>
                </div>
            </div>
        </header>
    );
}

AdminTransactionsHeader.displayName = "AdminTransactionsHeader";
