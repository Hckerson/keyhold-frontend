import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { disputesAPI } from "@/lib/api/disputes";
import { escrowAPI } from "@/lib/api/escrow";
import {
    aDispute,
    aDisputePage,
    aFrozenHold,
} from "@/lib/data/__fixtures__/disputes";
import { queryKeys } from "@/lib/hooks/query-keys";
import { useDisputeQueue } from "@/lib/hooks/use-dispute-queue";
import type { DisputeDecisionMode } from "@/lib/types";

vi.mock("@/lib/api/disputes", () => ({
    disputesAPI: { list: vi.fn(), resolve: vi.fn(), dismiss: vi.fn() },
}));
vi.mock("@/lib/api/escrow", () => ({ escrowAPI: { holds: vi.fn() } }));

const list = vi.mocked(disputesAPI.list);
const resolve = vi.mocked(disputesAPI.resolve);
const dismiss = vi.mocked(disputesAPI.dismiss);
const holds = vi.mocked(escrowAPI.holds);

const NOTE = "  Checked the closing statement.  ";

let client: QueryClient;

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

const loaded = async () => {
    const { result } = renderHook(() => useDisputeQueue(), { wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false));
    return result;
};

const decide = async (mode: DisputeDecisionMode) => {
    const result = await loaded();
    act(() => result.current.openDecision(mode, "dsp_1"));
    act(() => result.current.setNote(NOTE));
    act(() => result.current.submitDecision());
    return result;
};

beforeEach(() => {
    vi.clearAllMocks();
    client = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });
    list.mockResolvedValue(aDisputePage());
    holds.mockResolvedValue([aFrozenHold()]);
    resolve.mockResolvedValue(aDispute({ status: "RESOLVED" }));
    dismiss.mockResolvedValue(aDispute({ status: "DISMISSED" }));
});

describe("useDisputeQueue", () => {
    it("1.3 keeps the queue and its decisions working when the escrow load fails", async () => {
        holds.mockRejectedValue(new Error("escrow down"));

        const result = await loaded();

        expect(result.current.failed).toBe(false);
        expect(result.current.active?.deals[0]).toMatchObject({
            holdId: "esc_1",
            escrow: null,
        });
    });

    it("3.1 opens the confirmation with an empty note and calls nothing", async () => {
        const result = await loaded();
        act(() => result.current.setNote("left over"));
        act(() => result.current.openDecision("refund", "dsp_1"));

        expect(result.current.decision).toEqual({
            mode: "refund",
            id: "dsp_1",
        });
        expect(result.current.note).toBe("");
        expect(resolve).not.toHaveBeenCalled();
        expect(dismiss).not.toHaveBeenCalled();
    });

    it("3.4 release resolves with the trimmed note and the outcome RELEASE, once", async () => {
        await decide("release");

        await waitFor(() =>
            expect(resolve).toHaveBeenCalledExactlyOnceWith("dsp_1", {
                resolutionNotes: NOTE.trim(),
                outcome: "RELEASE",
            }),
        );
    });

    it("3.5 refund resolves with the trimmed note and the outcome REFUND, once", async () => {
        await decide("refund");

        await waitFor(() =>
            expect(resolve).toHaveBeenCalledExactlyOnceWith("dsp_1", {
                resolutionNotes: NOTE.trim(),
                outcome: "REFUND",
            }),
        );
    });

    it("3.6 resolving a dispute with no hold sends the outcome RELEASE", async () => {
        list.mockResolvedValue(aDisputePage([aDispute({ transactions: [] })]));

        await decide("resolve");

        await waitFor(() =>
            expect(resolve).toHaveBeenCalledExactlyOnceWith("dsp_1", {
                resolutionNotes: NOTE.trim(),
                outcome: "RELEASE",
            }),
        );
    });

    it("3.7 dismiss calls the dismiss endpoint with the trimmed note and no outcome", async () => {
        await decide("dismiss");

        await waitFor(() =>
            expect(dismiss).toHaveBeenCalledExactlyOnceWith("dsp_1", {
                resolutionNotes: NOTE.trim(),
            }),
        );
        expect(resolve).not.toHaveBeenCalled();
    });

    it("3.8 closing the confirmation without confirming calls nothing", async () => {
        const result = await loaded();
        act(() => result.current.openDecision("release", "dsp_1"));
        act(() => result.current.closeDecision());

        expect(result.current.decision).toBeNull();
        expect(resolve).not.toHaveBeenCalled();
    });

    it("3.9 invalidates the dispute, escrow and transaction caches once it lands", async () => {
        const invalidate = vi.spyOn(client, "invalidateQueries");

        await decide("refund");

        await waitFor(() =>
            expect(
                invalidate.mock.calls.map(([filters]) => filters?.queryKey),
            ).toEqual(
                expect.arrayContaining([
                    queryKeys.disputes.all,
                    queryKeys.escrow.all,
                    queryKeys.transactions.all,
                ]),
            ),
        );
    });
});
