import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const PAYMENTS_TITLE = "Payments & Payouts";
const PAYMENTS_LEDE =
    "What the platform earned, what it still owes agents, and what is stuck on the way out";
const LEDGER_ACTION = "Transaction Ledger";

export interface AdminPaymentsHeaderProps {
    summary: string;
}

export function AdminPaymentsHeader({ summary }: AdminPaymentsHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {PAYMENTS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {PAYMENTS_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Link
                    href="/admin/transactions"
                    className={buttonVariants({
                        variant: "primary",
                        size: "sm",
                    })}
                >
                    {LEDGER_ACTION}
                </Link>
            </div>
        </header>
    );
}

AdminPaymentsHeader.displayName = "AdminPaymentsHeader";
