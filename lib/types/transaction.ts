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
