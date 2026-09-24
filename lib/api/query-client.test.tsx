import type { ReactNode } from "react";
import { AxiosError, AxiosHeaders } from "axios";
import {
    QueryClientProvider,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createQueryClient } from "@/lib/api/query-client";
import { GENERIC_FAILURE, type MutationFeedback } from "@/lib/config/feedback";
import { useToastStore } from "@/lib/stores/toast-store";

let client: QueryClient;

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

const serverError = (message: string) => {
    const headers = new AxiosHeaders();
    return new AxiosError(
        "Request failed",
        "ERR_BAD_REQUEST",
        { headers },
        null,
        {
            status: 400,
            statusText: "Bad Request",
            headers,
            config: { headers },
            data: { message },
        },
    );
};

const expiredSession = () => {
    const headers = new AxiosHeaders();
    return new AxiosError(
        "Request failed",
        "ERR_BAD_REQUEST",
        { headers },
        null,
        {
            status: 401,
            statusText: "Unauthorized",
            headers,
            config: { headers },
            data: { message: "This session has been ended" },
        },
    );
};

const runQuery = (key: string, failure: unknown) => {
    const queryFn = vi.fn().mockRejectedValue(failure);
    const { result } = renderHook(
        () => useQuery({ queryKey: [key], queryFn, retryDelay: 0 }),
        { wrapper },
    );
    return { queryFn, result };
};

const runMutation = async (
    meta: MutationFeedback,
    outcome: () => Promise<string>,
) => {
    const { result } = renderHook(
        () => useMutation({ meta, mutationFn: outcome }),
        { wrapper },
    );

    result.current.mutate();
    await waitFor(() => expect(result.current.isPending).toBe(false));
};

const toasts = () => useToastStore.getState().toasts;

beforeEach(() => {
    useToastStore.getState().clear();
    client = createQueryClient();
});

describe("mutation feedback", () => {
    it("reports a failure the caller never wired", async () => {
        await runMutation({}, () => Promise.reject(new Error("offline")));

        expect(toasts()).toHaveLength(1);
        expect(toasts()[0]).toMatchObject({
            tone: "error",
            title: GENERIC_FAILURE,
        });
    });

    it("prefers the declared copy over the generic fallback", async () => {
        await runMutation({ error: "We couldn't send your enquiry." }, () =>
            Promise.reject(new Error("offline")),
        );

        expect(toasts()[0].title).toBe("We couldn't send your enquiry.");
    });

    it("surfaces the backend message beneath the declared copy", async () => {
        await runMutation({ error: "We couldn't send your enquiry." }, () =>
            Promise.reject(serverError("Connection already exists")),
        );

        expect(toasts()[0].description).toBe("Connection already exists");
    });

    it("stays quiet when the failure is already reported in place", async () => {
        await runMutation({ silentError: true }, () =>
            Promise.reject(new Error("offline")),
        );

        expect(toasts()).toHaveLength(0);
    });

    it("confirms success only when the mutation declares copy for it", async () => {
        await runMutation({}, () => Promise.resolve("done"));
        expect(toasts()).toHaveLength(0);

        await runMutation({ success: "Offer submitted" }, () =>
            Promise.resolve("done"),
        );
        expect(toasts()[0]).toMatchObject({
            tone: "success",
            title: "Offer submitted",
        });
    });

    it("confirms success on a mutation whose errors are handled inline", async () => {
        await runMutation(
            { success: "Offer submitted", silentError: true },
            () => Promise.resolve("done"),
        );

        expect(toasts()[0].title).toBe("Offer submitted");
    });
});

describe("retry policy", () => {
    it("gives a stumbling service a second chance", async () => {
        const { queryFn } = runQuery("stumble", serverError("Upstream failed"));

        await waitFor(() => expect(queryFn).toHaveBeenCalledTimes(2));
    });

    it("spends no second request on a session the server has ended", async () => {
        const { queryFn, result } = runQuery("expired", expiredSession());

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(queryFn).toHaveBeenCalledOnce();
    });

    it("never sends a failed write a second time", async () => {
        const mutationFn = vi
            .fn()
            .mockRejectedValue(serverError("Upstream failed"));
        const { result } = renderHook(() => useMutation({ mutationFn }), {
            wrapper,
        });

        result.current.mutate();

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(mutationFn).toHaveBeenCalledOnce();
    });
});
