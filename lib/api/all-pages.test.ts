import { describe, expect, it, vi } from "vitest";
import { allPages, type Paging } from "@/lib/api/all-pages";

const PAGE_SIZE = 100;

const servePages = (pageCount: number) =>
    vi.fn(({ page }: Paging) =>
        Promise.resolve({ items: [`row_${page}`], pageCount }),
    );

describe("allPages", () => {
    it("joins every page in page order", async () => {
        const fetchPage = servePages(3);

        expect(await allPages(fetchPage)).toEqual(["row_1", "row_2", "row_3"]);
        expect(fetchPage.mock.calls.map(([paging]) => paging.page)).toEqual([
            1, 2, 3,
        ]);
    });

    it("asks only once when everything fits in a single page", async () => {
        const fetchPage = servePages(1);

        await allPages(fetchPage);

        expect(fetchPage).toHaveBeenCalledOnce();
    });

    it("asks for a hundred rows a page", async () => {
        const fetchPage = servePages(2);

        await allPages(fetchPage);

        expect(
            fetchPage.mock.calls.every(
                ([paging]) => paging.limit === PAGE_SIZE,
            ),
        ).toBe(true);
    });

    it("fails as a whole when any page fails, rather than returning part of the list", async () => {
        const fetchPage = servePages(3);
        fetchPage.mockImplementationOnce(() =>
            Promise.resolve({ items: ["row_1"], pageCount: 3 }),
        );
        fetchPage.mockRejectedValueOnce(new Error("page 2 down"));

        await expect(allPages(fetchPage)).rejects.toThrow("page 2 down");
    });
});
