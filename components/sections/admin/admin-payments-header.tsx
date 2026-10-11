import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { ADMIN_ROUTES } from "@/lib/constants";
import { FEE_RATE_LABEL } from "@/lib/data/admin-payments";

const PAYMENTS_TITLE = "Payments & Payouts";
const PAYMENTS_LEDE = `What escrow still holds, what agents are owed, and what is stuck on the way out, at a ${FEE_RATE_LABEL} platform fee`;
const LEDGER_ACTION = "Transaction Ledger";

export function AdminPaymentsHeader() {
    return (
        <PortalHeader
            title={PAYMENTS_TITLE}
            lede={PAYMENTS_LEDE}
            action={
                <Link
                    href={ADMIN_ROUTES.transactions}
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
