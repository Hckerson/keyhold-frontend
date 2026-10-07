import { beforeEach, describe, expect, it, vi } from "vitest";
import { query } from "@/lib/api/client";
import { transactionsAPI } from "@/lib/api/transactions";
import { aLedgerDeal } from "@/lib/data/__fixtures__/transactions";
import type { TransactionQuery } from "@/lib/validations/transaction";

vi.mock("@/lib/api/client", () => ({ query: { get: vi.fn() } }));

const get = vi.mocked(query.get);

const PAGE_SIZE = 100;

const servePages = (pageCount: number) =>
    get.mockImplementation((_url, options) => {
        const { page = 1 } = (options?.params ?? {}) as TransactionQuery;
        return Promise.resolve({
            items: [aLedgerDeal({ id: `txn_${page}` })],
            total: pageCount,
            page,
            limit: PAGE_SIZE,
            pageCount,
        });
    });

const pagesAsked = () =>
    get.mock.calls.map(
        ([, options]) => (options?.params as TransactionQuery).page,
    );

beforeEach(() => get.mockReset());

describe("transactionsAPI.ledger", () => {
    it("joins every page of the ledger in page order", async () => {
        servePages(3);

        const deals = await transactionsAPI.ledger();

        expect(deals.map((deal) => deal.id)).toEqual([
            "txn_1",
            "txn_2",
            "txn_3",
        ]);
        expect(pagesAsked()).toEqual([1, 2, 3]);
    });

    it("asks only once when the ledger fits in a single page", async () => {
        servePages(1);

        await transactionsAPI.ledger();

        expect(get).toHaveBeenCalledOnce();
    });

    it("requests a hundred deals a page unless told otherwise", async () => {
        servePages(1);

        await transactionsAPI.ledger({ status: "COMPLETED" });

        expect(get.mock.calls[0][1]?.params).toEqual({
            limit: PAGE_SIZE,
            status: "COMPLETED",
            page: 1,
        });
    });

    it("fails as a whole when any page fails, rather than returning a partial ledger", async () => {
        servePages(3);
        get.mockImplementationOnce(() =>
            Promise.resolve({
                items: [aLedgerDeal()],
                total: 3,
                page: 1,
                limit: PAGE_SIZE,
                pageCount: 3,
            }),
        );
        get.mockRejectedValueOnce(new Error("page 2 down"));

        await expect(transactionsAPI.ledger()).rejects.toThrow("page 2 down");
    });
});
