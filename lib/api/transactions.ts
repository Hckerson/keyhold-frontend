import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateTransactionInput,
    CreateTransactionResult,
    SettledTransaction,
    Transaction,
    TransactionPage,
    TransactionQuery,
    TransactionStage,
} from "@/lib/validations/transaction";

const LEDGER_PAGE_SIZE = 100;
const FIRST_PAGE = 1;

export const transactionsAPI = {
    list: (input: TransactionQuery = {}) =>
        query.get<TransactionPage>(config.api.transactions.list, {
            params: input,
        }),

    ledger: async (input: TransactionQuery = {}) => {
        const params = { limit: LEDGER_PAGE_SIZE, ...input };
        const first = await transactionsAPI.list({
            ...params,
            page: FIRST_PAGE,
        });
        const rest = await Promise.all(
            Array.from({ length: first.pageCount - FIRST_PAGE }, (_, index) =>
                transactionsAPI.list({ ...params, page: index + 2 }),
            ),
        );
        return [first, ...rest].flatMap((page) => page.items);
    },

    stages: () => query.get<TransactionStage[]>(config.api.transactions.stages),

    purchases: () =>
        query.get<Transaction[]>(config.api.transactions.purchases),

    sales: () => query.get<Transaction[]>(config.api.transactions.sales),

    detail: (id: string) =>
        query.get<Transaction>(config.api.transactions.detail(id)),

    create: (input: CreateTransactionInput) =>
        query.post<CreateTransactionResult>(
            config.api.transactions.create,
            input,
        ),

    confirmPayment: (id: string, paymentIntentId: string) =>
        query.post<SettledTransaction>(
            config.api.transactions.confirmPayment(id),
            { paymentIntentId },
        ),
};
