import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const PAYMENTS_TITLE = "Payments & Payouts";
const PAYMENTS_LEDE =
    "What the platform earned, what it still owes agents, and what is stuck on the way out";
const LEDGER_ACTION = "Transaction Ledger";

export interface AdminPaymentsHeaderProps {
    summary: string;
}

export function AdminPaymentsHeader({ summary }: AdminPaymentsHeaderProps) {
    return (
        <PortalHeader
            title={PAYMENTS_TITLE}
            lede={PAYMENTS_LEDE}
            summary={summary}
            action={
                <Link
                    href="/admin/transactions"
                    className={buttonVariants({
                        emphasis: "solid",
                        tone: "accent",
                        size: "sm",
                    })}
                >
                    {LEDGER_ACTION}
                </Link>
            }
        />
    );
}

AdminPaymentsHeader.displayName = "AdminPaymentsHeader";
