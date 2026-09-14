import { describe, expect, it } from "vitest";
import {
    MAP_TILE_ORIGIN,
    securityHeaders,
} from "@/lib/config/security-headers";

const connectSourcesFor = (apiBase: string) =>
    securityHeaders(apiBase)
        .find((header) => header.key === "Content-Security-Policy")
        ?.value.split("; ")
        .find((directive) => directive.startsWith("connect-src "))
        ?.split(" ")
        .slice(1) ?? [];

describe("connect-src", () => {
    it("permits requests to paths beneath the API base, not only the base itself", () => {
        const sources = connectSourcesFor("http://localhost:5000/api");

        expect(sources).toContain("http://localhost:5000");
        expect(sources).not.toContain("http://localhost:5000/api");
    });

    it("permits a deployed API base on a non-default port and scheme", () => {
        expect(connectSourcesFor("https://api.example.com/v1/api")).toContain(
            "https://api.example.com",
        );
    });

    it("adds no cross-origin source when the API base is same-origin relative", () => {
        expect(connectSourcesFor("/api")).toEqual([
            "'self'",
            "https://api.stripe.com",
            "https://*.stripe.com",
            MAP_TILE_ORIGIN,
        ]);
    });
});
