import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateTransactionInput,
    Transaction,
} from "@/lib/validations/transaction";

export const transactionsAPI = {
    purchases: () =>
        query.get<Transaction[]>(config.api.transactions.purchases),

    sales: () => query.get<Transaction[]>(config.api.transactions.sales),

    detail: (id: string) =>
        query.get<Transaction>(config.api.transactions.detail(id)),

    create: (input: CreateTransactionInput) =>
        query.post<Transaction>(config.api.transactions.create, input),

    confirmPayment: (id: string) =>
        query.post<Transaction>(config.api.transactions.confirmPayment(id)),
};
