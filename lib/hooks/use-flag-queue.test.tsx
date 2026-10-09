import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { flagsAPI } from "@/lib/api/flags";
import { aMemberFlag, aMessageFlag } from "@/lib/data/__fixtures__/flags";
import { useFlagQueue } from "@/lib/hooks/use-flag-queue";

vi.mock("@/lib/api/flags", () => ({
    flagsAPI: { all: vi.fn(), resolve: vi.fn(), dismiss: vi.fn() },
}));

const list = vi.mocked(flagsAPI.all);
const resolve = vi.mocked(flagsAPI.resolve);

let client: QueryClient;

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

beforeEach(() => {
    vi.clearAllMocks();
    client = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });
    list.mockImplementation((input = {}) =>
        Promise.resolve(
            input.type === "USER" ? [aMemberFlag()] : [aMessageFlag()],
        ),
    );
    resolve.mockResolvedValue(aMemberFlag({ status: "RESOLVED" }));
});

const loaded = async () => {
    const { result } = renderHook(() => useFlagQueue(), { wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false));
    return result;
};

describe("useFlagQueue", () => {
    it("asks for member and message reports by type, so listing flags never crowd them out", async () => {
        const result = await loaded();

        expect(list.mock.calls.map(([input]) => input?.type).sort()).toEqual([
            "MESSAGE",
            "USER",
        ]);
        expect(result.current.reports.map((report) => report.type)).toEqual([
            "USER",
            "MESSAGE",
        ]);
    });

    it("upholds without a note, so the reporter's own words are never overwritten", async () => {
        const result = await loaded();
        act(() => result.current.requestSettle("resolve", "flg_member"));
        act(() => result.current.confirmSettle());

        await waitFor(() => expect(resolve).toHaveBeenCalledOnce());
        expect(resolve.mock.calls[0][0]).toBe("flg_member");
        expect(resolve.mock.calls[0][1]?.note).toBeUndefined();
    });
});
