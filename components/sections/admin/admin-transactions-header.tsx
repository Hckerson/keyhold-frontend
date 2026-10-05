import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { ADMIN_ROUTES } from "@/lib/constants";
import { COMMISSION_RATE_LABEL } from "@/lib/data/admin-transactions";

const TRANSACTIONS_TITLE = "Transactions";
const TRANSACTIONS_LEDE = `Every deal between an accepted offer and a settled commission, at a ${COMMISSION_RATE_LABEL} take rate`;
const EXPORT_ACTION = "Export";
const PAYOUTS_ACTION = "Payouts";

export interface AdminTransactionsHeaderProps {
    onExport: () => void;
}

export function AdminTransactionsHeader({
    onExport,
}: AdminTransactionsHeaderProps) {
    return (
        <PortalHeader
            title={TRANSACTIONS_TITLE}
            lede={TRANSACTIONS_LEDE}
            action={
                <>
                    <Button type="button" onClick={onExport}>
                        {EXPORT_ACTION}
                    </Button>
                    <Link
                        href={ADMIN_ROUTES.payments}
                        className={buttonVariants({
                            emphasis: "solid",
                            tone: "accent",
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
