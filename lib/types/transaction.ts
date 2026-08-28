export type LedgerStatus =
    | "PENDING"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";

export type TransactionMilestoneId =
    | "agreement"
    | "deposit"
    | "inspection"
    | "settlement";

export interface LedgerTransaction {
    id: string;
    reference: string;
    property: string;
    buyer: string;
    agent: string;
    price: number;
    status: LedgerStatus;
    cleared: TransactionMilestoneId[];
    initiatedDate: string;
    completedDate: string | null;
    ageMinutes: number;
}

export interface TransactionStage {
    id: LedgerStatus;
    count: number;
    volume: number;
}
