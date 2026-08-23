import { PortalHeader } from "@/components/patterns/portal-header";

const TITLE = "Transactions";
const LEDE = "Money held in escrow and the sales it is waiting on";

export interface TransactionsHeaderProps {
    summary: string;
}

export function TransactionsHeader({ summary }: TransactionsHeaderProps) {
    return <PortalHeader title={TITLE} lede={LEDE} summary={summary} />;
}

TransactionsHeader.displayName = "TransactionsHeader";
