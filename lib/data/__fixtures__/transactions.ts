import { aTransaction } from "@/lib/data/__fixtures__/purchases";
import type {
    SettlementTransaction,
    TransactionPage,
    TransactionStage,
} from "@/lib/validations/transaction";

export const aLedgerDeal = (
    overrides: Partial<SettlementTransaction> = {},
): SettlementTransaction => ({
    ...aTransaction(),
    buyer: { id: "usr_buyer", fullName: "Ada Vance" },
    seller: { id: "usr_seller", fullName: "Marta Vance" },
    property: {
        id: "prop_1",
        title: "Cypress Point",
        address: "18 Cypress Point",
        locality: "Carmel",
        price: 1_250_000,
    },
    ...overrides,
});

export const aLedgerPage = (
    items: SettlementTransaction[] = [],
): TransactionPage => ({
    items,
    total: items.length,
    page: 1,
    limit: items.length,
    pageCount: 1,
});

export const aStage = (
    overrides: Partial<TransactionStage> & Pick<TransactionStage, "status">,
): TransactionStage => ({
    count: 0,
    volume: 0,
    ...overrides,
});
