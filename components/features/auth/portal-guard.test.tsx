import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PortalGuard } from "@/components/features/auth/portal-guard";
import { SessionProvider } from "@/components/providers/session-provider";
import { usersAPI } from "@/lib/api/users";
import { aMemberRecord } from "@/lib/data/__fixtures__/users";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { User } from "@/lib/validations/user";

const PORTAL_CONTENT = "Practice Overview";

const replace = vi.fn();

vi.mock("next/navigation", () => ({
    useRouter: () => ({ replace }),
    usePathname: () => "/agent",
}));

vi.mock("@/lib/api/users", () => ({ usersAPI: { me: vi.fn() } }));

const me = vi.mocked(usersAPI.me);

let client: QueryClient;

const renderGuard = () =>
    render(
        <QueryClientProvider client={client}>
            <SessionProvider>
                <PortalGuard role="SELLER">
                    <p>{PORTAL_CONTENT}</p>
                </PortalGuard>
            </SessionProvider>
        </QueryClientProvider>,
    );

const signedInAs = (role: "SELLER" | "BUYER") => {
    const record = aMemberRecord({ role });
    useAuthStore.setState({
        user: {
            id: record.id,
            name: record.fullName,
            email: record.email ?? "",
            role,
        },
    });
    me.mockResolvedValue(record);
};

beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ user: null });
    client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
});

describe("PortalGuard", () => {
    it("opens the portal to the member whose role owns it", async () => {
        signedInAs("SELLER");

        renderGuard();

        expect(await screen.findByText(PORTAL_CONTENT)).toBeInTheDocument();
        expect(replace).not.toHaveBeenCalled();
    });

    it("sends a signed-out visitor to sign in with the portal as the return target", async () => {
        me.mockRejectedValue(new Error("Unauthorized"));

        renderGuard();

        await waitFor(() =>
            expect(replace).toHaveBeenCalledWith("/login?redirect=%2Fagent"),
        );
        expect(screen.queryByText(PORTAL_CONTENT)).not.toBeInTheDocument();
    });

    it("returns a buyer who lands on the agent portal to their own", async () => {
        signedInAs("BUYER");

        renderGuard();

        await waitFor(() => expect(replace).toHaveBeenCalledWith("/dashboard"));
        expect(screen.queryByText(PORTAL_CONTENT)).not.toBeInTheDocument();
    });

    it("drops the portal the moment a dead session is cleared, before any panel can blame the service", async () => {
        signedInAs("SELLER");

        renderGuard();
        await screen.findByText(PORTAL_CONTENT);

        me.mockRejectedValue(new Error("Unauthorized"));
        act(() => useAuthStore.getState().clearAuth());

        await waitFor(() =>
            expect(screen.queryByText(PORTAL_CONTENT)).not.toBeInTheDocument(),
        );
    });

    it("holds the portal closed rather than guessing while the session is unresolved", async () => {
        me.mockReturnValue(new Promise<User>(() => {}));

        renderGuard();

        await waitFor(() => expect(me).toHaveBeenCalled());
        expect(replace).not.toHaveBeenCalled();
        expect(screen.queryByText(PORTAL_CONTENT)).not.toBeInTheDocument();
    });
});
