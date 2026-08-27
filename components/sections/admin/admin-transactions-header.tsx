import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const TRANSACTIONS_TITLE = "Transactions";
const TRANSACTIONS_LEDE =
    "Every deal between an accepted offer and a settled commission";
const EXPORT_ACTION = "Export";
const PAYOUTS_ACTION = "Payouts";

export interface AdminTransactionsHeaderProps {
    summary: string;
    onExport: () => void;
}

export function AdminTransactionsHeader({
    summary,
    onExport,
}: AdminTransactionsHeaderProps) {
    return (
        <PortalHeader
            title={TRANSACTIONS_TITLE}
            lede={TRANSACTIONS_LEDE}
            summary={summary}
            action={
                <>
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={onExport}
                    >
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
                </>
            }
        />
    );
}

AdminTransactionsHeader.displayName = "AdminTransactionsHeader";
