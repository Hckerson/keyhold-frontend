import { AxiosError, AxiosHeaders } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { apiClient, query } from "@/lib/api/client";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { AuthUser } from "@/lib/types/auth";

const MEMBER: AuthUser = {
    id: "usr_1",
    name: "Ada Vance",
    email: "ada@keyhol.me",
    role: "SELLER",
};

const untouched = apiClient.defaults.adapter;

const failWith = (status: number) => (config: InternalAxiosRequestConfig) => {
    const headers = new AxiosHeaders();
    return Promise.reject(
        new AxiosError("Request failed", "ERR_BAD_RESPONSE", config, null, {
            status,
            statusText: "",
            headers,
            config,
            data: {},
        }),
    );
};

const standOn = (pathname: string) =>
    Object.defineProperty(window, "location", {
        configurable: true,
        value: { pathname, href: pathname },
    });

const call = () => query.get("/stats/seller");

beforeEach(() => useAuthStore.setState({ user: MEMBER }));

afterEach(() => {
    apiClient.defaults.adapter = untouched;
    useAuthStore.setState({ user: null });
});

describe("expired sessions", () => {
    it("sends a member out of a portal to sign in, keeping the page as the return target", async () => {
        standOn("/agent");
        apiClient.defaults.adapter = failWith(401);

        await expect(call()).rejects.toBeInstanceOf(AxiosError);

        expect(useAuthStore.getState().user).toBeNull();
        expect(window.location.href).toBe("/login?redirect=%2Fagent&expired=1");
    });

    it("still sends the member out once the stored session has already been cleared", async () => {
        standOn("/agent/leads");
        apiClient.defaults.adapter = failWith(401);

        await expect(call()).rejects.toBeInstanceOf(AxiosError);
        window.location.href = "/agent/leads";

        await expect(call()).rejects.toBeInstanceOf(AxiosError);

        expect(window.location.href).toBe(
            "/login?redirect=%2Fagent%2Fleads&expired=1",
        );
    });

    it("reaches every portal, not only the one the member came from", async () => {
        apiClient.defaults.adapter = failWith(401);

        for (const portal of ["/dashboard", "/admin"]) {
            standOn(portal);
            await expect(call()).rejects.toBeInstanceOf(AxiosError);
            expect(window.location.href).toContain("/login?redirect=");
        }
    });

    it("leaves a visitor on a public page where an unauthenticated call is ordinary", async () => {
        standOn("/search");
        apiClient.defaults.adapter = failWith(401);

        await expect(call()).rejects.toBeInstanceOf(AxiosError);

        expect(useAuthStore.getState().user).toBeNull();
        expect(window.location.href).toBe("/search");
    });

    it("keeps the member signed in when the service fails for any other reason", async () => {
        standOn("/agent");
        apiClient.defaults.adapter = failWith(503);

        await expect(call()).rejects.toBeInstanceOf(AxiosError);

        expect(useAuthStore.getState().user).toEqual(MEMBER);
        expect(window.location.href).toBe("/agent");
    });
});
