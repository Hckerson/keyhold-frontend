import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
    type MockInstance,
} from "vitest";
import { escrowAPI } from "@/lib/api/escrow";
import { anEscrowRelease } from "@/lib/data/__fixtures__/purchases";
import { queryKeys } from "@/lib/hooks/query-keys";
import { useReleaseEscrow } from "@/lib/hooks/use-escrow";

vi.mock("@/lib/api/escrow", () => ({
    escrowAPI: { release: vi.fn() },
}));

const release = vi.mocked(escrowAPI.release);

let client: QueryClient;

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

const invalidatedKeys = (spy: MockInstance<QueryClient["invalidateQueries"]>) =>
    spy.mock.calls.map(([filters]) => filters?.queryKey);

beforeEach(() => {
    client = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });
});

describe("useReleaseEscrow", () => {
    it("3.4 releases the escrow by its own id", async () => {
        release.mockResolvedValue(anEscrowRelease());

        const { result } = renderHook(() => useReleaseEscrow(), { wrapper });
        await result.current.mutateAsync("esc_7");

        expect(release).toHaveBeenCalledExactlyOnceWith("esc_7");
    });

    it("3.7 invalidates escrow, transactions and properties on success", async () => {
        release.mockResolvedValue(anEscrowRelease());
        const invalidate = vi.spyOn(client, "invalidateQueries");

        const { result } = renderHook(() => useReleaseEscrow(), { wrapper });
        await result.current.mutateAsync("esc_7");

        await waitFor(() => {
            expect(invalidatedKeys(invalidate)).toEqual(
                expect.arrayContaining([
                    queryKeys.escrow.all,
                    queryKeys.transactions.all,
                    queryKeys.properties.all,
                ]),
            );
        });
    });

    it("5.2 invalidates nothing when the release fails", async () => {
        release.mockRejectedValue(new Error("gateway down"));
        const invalidate = vi.spyOn(client, "invalidateQueries");

        const { result } = renderHook(() => useReleaseEscrow(), { wrapper });
        await expect(result.current.mutateAsync("esc_7")).rejects.toThrow(
            "gateway down",
        );

        expect(invalidate).not.toHaveBeenCalled();
    });

    it("5.4 allows the same release to be attempted again after a failure", async () => {
        release.mockRejectedValueOnce(new Error("gateway down"));
        release.mockResolvedValueOnce(anEscrowRelease());

        const { result } = renderHook(() => useReleaseEscrow(), { wrapper });
        await expect(result.current.mutateAsync("esc_7")).rejects.toThrow();
        await result.current.mutateAsync("esc_7");

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(release).toHaveBeenCalledTimes(2);
    });
});
