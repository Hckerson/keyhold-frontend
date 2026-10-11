import type { AuditLogQuery } from "@/lib/validations/audit-log";
import type { DisputeQuery } from "@/lib/validations/dispute";
import type { EscrowQuery } from "@/lib/validations/escrow";
import type { FlagQuery } from "@/lib/validations/flag";
import type { KycQuery } from "@/lib/validations/kyc";
import type { SuspensionQuery } from "@/lib/validations/suspension";
import type { TransactionQuery } from "@/lib/validations/transaction";

export const governanceKeys = {
    transactions: {
        all: ["transactions"] as const,
        list: (input: TransactionQuery) =>
            ["transactions", "list", input] as const,
        stages: ["transactions", "stages"] as const,
        purchases: ["transactions", "purchases"] as const,
        sales: ["transactions", "sales"] as const,
        detail: (id: string) => ["transactions", "detail", id] as const,
    },
    flags: {
        all: ["flags"] as const,
        list: (input: FlagQuery) => ["flags", "list", input] as const,
        counts: ["flags", "counts"] as const,
        detail: (id: string) => ["flags", "detail", id] as const,
    },
    kyc: {
        all: ["kyc"] as const,
        list: (input: KycQuery) => ["kyc", "list", input] as const,
        counts: ["kyc", "counts"] as const,
        mine: ["kyc", "mine"] as const,
        detail: (id: string) => ["kyc", "detail", id] as const,
    },
    suspensions: {
        all: ["suspensions"] as const,
        list: (input: SuspensionQuery) =>
            ["suspensions", "list", input] as const,
        byUser: (userId: string) => ["suspensions", "user", userId] as const,
    },
    escrow: {
        all: ["escrow"] as const,
        list: (input: EscrowQuery) => ["escrow", "list", input] as const,
        stages: ["escrow", "stages"] as const,
        detail: (id: string) => ["escrow", "detail", id] as const,
    },
    disputes: {
        all: ["disputes"] as const,
        list: (input: DisputeQuery) => ["disputes", "list", input] as const,
        mine: ["disputes", "mine"] as const,
        counts: ["disputes", "counts"] as const,
        detail: (id: string) => ["disputes", "detail", id] as const,
    },
    auditLogs: {
        all: ["audit-logs"] as const,
        list: (input: AuditLogQuery) => ["audit-logs", "list", input] as const,
    },
};
