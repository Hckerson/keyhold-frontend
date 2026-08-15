export type TransactionStatus =
    | "pending"
    | "escrow"
    | "closing"
    | "completed"
    | "failed";

export type TransactionFinancing = "cash" | "mortgage" | "portfolio";

export type TransactionMilestoneId =
    | "agreement"
    | "deposit"
    | "inspection"
    | "financing"
    | "settlement";

export interface Transaction {
    id: string;
    reference: string;
    property: string;
    buyer: string;
    agent: string;
    price: number;
    status: TransactionStatus;
    financing: TransactionFinancing;
    cleared: TransactionMilestoneId[];
    initiatedDate: string;
    closingDate: string;
    ageMinutes: number;
}

export interface TransactionStage {
    id: TransactionStatus;
    count: number;
    volume: number;
}
