import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
            <div className="flex min-w-0 flex-1 items-center justify-between gap-x-6 gap-y-2 sm:flex-none sm:justify-end">
                <p className="micro-label max-w-60 min-w-0 leading-relaxed text-pretty">
                    {summary}
                </p>
                <Link
                    href="/admin/transactions"
                    className={cn(
                        buttonVariants({ variant: "primary", size: "sm" }),
                        "shrink-0",
                    )}
                >
                    {LEDGER_ACTION}
                </Link>
            </div>
        </header>
    );
}

AdminPaymentsHeader.displayName = "AdminPaymentsHeader";
