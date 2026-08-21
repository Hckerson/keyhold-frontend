import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateTransactionInput,
    Transaction,
    TransactionPage,
    TransactionQuery,
    TransactionStage,
} from "@/lib/validations/transaction";

export const transactionsAPI = {
    list: (input: TransactionQuery = {}) =>
        query.get<TransactionPage>(config.api.transactions.list, {
            params: input,
        }),

    stages: () => query.get<TransactionStage[]>(config.api.transactions.stages),

    purchases: () =>
        query.get<Transaction[]>(config.api.transactions.purchases),

    sales: () => query.get<Transaction[]>(config.api.transactions.sales),

    detail: (id: string) =>
        query.get<Transaction>(config.api.transactions.detail(id)),

    create: (input: CreateTransactionInput) =>
        query.post<Transaction>(config.api.transactions.create, input),

    confirmPayment: (id: string, paymentIntentId: string) =>
        query.post<Transaction>(config.api.transactions.confirmPayment(id), {
            paymentIntentId,
        }),
};
