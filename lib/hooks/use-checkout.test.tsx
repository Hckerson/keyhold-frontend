import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { transactionsAPI } from "@/lib/api/transactions";
import {
    aCheckoutSession,
    aSettlement,
} from "@/lib/data/__fixtures__/purchases";
import { useCheckout } from "@/lib/hooks/use-checkout";

vi.mock("@/lib/api/transactions", () => ({
    transactionsAPI: { create: vi.fn(), confirmPayment: vi.fn() },
}));

const create = vi.mocked(transactionsAPI.create);
const confirmPayment = vi.mocked(transactionsAPI.confirmPayment);

const PURCHASE = {
    offerId: "off_1",
    finalPrice: 1_150_000,
    terms: "Cash, thirty-day close",
};

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
});

describe("useCheckout", () => {
    it("exposes the client secret returned alongside the new transaction", async () => {
        create.mockResolvedValue(aCheckoutSession());

        const { result } = renderHook(() => useCheckout(), { wrapper });
        await act(() => result.current.open(PURCHASE));

        expect(create).toHaveBeenCalledExactlyOnceWith(PURCHASE);
        expect(result.current.session?.paymentIntent.clientSecret).toBe(
            "pi_1_secret_test",
        );
    });

    it("marks the checkout active before the transaction comes back", async () => {
        create.mockResolvedValue(aCheckoutSession());

        const { result } = renderHook(() => useCheckout(), { wrapper });
        await act(() => result.current.open(PURCHASE));

        expect(result.current.active).toBe(true);
    });

    it("surfaces a failure to open the checkout instead of throwing", async () => {
        create.mockRejectedValue(new Error("Offer must be accepted"));

        const { result } = renderHook(() => useCheckout(), { wrapper });
        await act(() => result.current.open(PURCHASE));

        expect(result.current.error).toBe("Offer must be accepted");
        expect(result.current.session).toBeUndefined();
    });

    it("confirms the payment against the transaction it created", async () => {
        create.mockResolvedValue(aCheckoutSession());
        confirmPayment.mockResolvedValue(aSettlement());

        const { result } = renderHook(() => useCheckout(), { wrapper });
        await act(() => result.current.open(PURCHASE));
        await act(() => result.current.settle("pi_1"));

        expect(confirmPayment).toHaveBeenCalledExactlyOnceWith("txn_1", "pi_1");
        await waitFor(() => expect(result.current.settled).toBe(true));
    });

    it("refuses to settle a payment when no checkout was opened", async () => {
        const { result } = renderHook(() => useCheckout(), { wrapper });
        await act(() => result.current.settle("pi_1"));

        expect(confirmPayment).not.toHaveBeenCalled();
    });

    it("reports a settlement failure without claiming the purchase completed", async () => {
        create.mockResolvedValue(aCheckoutSession());
        confirmPayment.mockRejectedValue(
            new Error("Payment could not be confirmed"),
        );

        const { result } = renderHook(() => useCheckout(), { wrapper });
        await act(() => result.current.open(PURCHASE));
        await act(() => result.current.settle("pi_1"));

        expect(result.current.settled).toBe(false);
        expect(result.current.error).toBe("Payment could not be confirmed");
    });

    it("clears the session when the buyer closes the checkout", async () => {
        create.mockResolvedValue(aCheckoutSession());

        const { result } = renderHook(() => useCheckout(), { wrapper });
        await act(() => result.current.open(PURCHASE));
        act(() => result.current.close());

        expect(result.current.active).toBe(false);
        expect(result.current.session).toBeUndefined();
    });
});
