import { generateKeyPairSync } from "node:crypto";
import { SignJWT, importPKCS8 } from "jose";
import { NextRequest } from "next/server";
import { beforeAll, describe, expect, it } from "vitest";
import {
    ACCESS_TOKEN_COOKIE,
    AUTH_ROUTES,
    PORTAL_BY_ROLE,
    REDIRECT_PARAM,
} from "@/lib/constants";

const real = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

const base64 = (pem: string) => Buffer.from(pem, "utf8").toString("base64");

let proxy: (request: NextRequest) => Promise<Response>;
let buyerToken: string;

const requestFor = (pathname: string, token?: string) => {
    const request = new NextRequest(new URL(`https://app.test${pathname}`));
    if (token) request.cookies.set(ACCESS_TOKEN_COOKIE, token);
    return request;
};

const locationOf = (response: Response) =>
    new URL(response.headers.get("location") ?? "https://app.test/");

beforeAll(async () => {
    process.env.JWT_PUBLIC_KEY = base64(real.publicKey);

    buyerToken = await new SignJWT({
        sub: "usr_1",
        email: "buyer@example.com",
        role: "BUYER",
    })
        .setProtectedHeader({ alg: "RS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(await importPKCS8(real.privateKey, "RS256"));

    ({ proxy } = await import("./proxy"));
});

describe("portal protection", () => {
    it("sends an anonymous visitor on a portal route to the login page", async () => {
        const response = await proxy(requestFor(PORTAL_BY_ROLE.BUYER));

        expect(response.status).toBe(307);
        expect(locationOf(response).pathname).toBe(AUTH_ROUTES.login);
    });

    it("remembers where the visitor was headed", async () => {
        const target = `${PORTAL_BY_ROLE.BUYER}/settings`;
        const response = await proxy(requestFor(target));

        expect(locationOf(response).searchParams.get(REDIRECT_PARAM)).toBe(
            target,
        );
    });

    it("lets a verified session into its own portal", async () => {
        const response = await proxy(
            requestFor(PORTAL_BY_ROLE.BUYER, buyerToken),
        );

        expect(response.headers.get("location")).toBeNull();
    });

    it("sends a verified session away from another role's portal", async () => {
        const response = await proxy(
            requestFor(PORTAL_BY_ROLE.ADMIN, buyerToken),
        );

        expect(locationOf(response).pathname).toBe(PORTAL_BY_ROLE.BUYER);
    });

    it("treats a forged cookie as no session at all", async () => {
        const forged = `${buyerToken.split(".").slice(0, 2).join(".")}.forged`;
        const response = await proxy(requestFor(PORTAL_BY_ROLE.BUYER, forged));

        expect(locationOf(response).pathname).toBe(AUTH_ROUTES.login);
    });

    it("clears the rejected cookie so it cannot be retried", async () => {
        const response = await proxy(
            requestFor(PORTAL_BY_ROLE.BUYER, "garbage"),
        );

        expect(response.headers.get("set-cookie")).toContain(
            ACCESS_TOKEN_COOKIE,
        );
    });

    it("leaves public routes open to anyone", async () => {
        const response = await proxy(requestFor(AUTH_ROUTES.home));

        expect(response.headers.get("location")).toBeNull();
    });

    it("bounces a signed-in visitor from the auth pages to their portal", async () => {
        const response = await proxy(requestFor(AUTH_ROUTES.login, buyerToken));

        expect(locationOf(response).pathname).toBe(PORTAL_BY_ROLE.BUYER);
    });

    it("leaves the auth pages reachable while signed out", async () => {
        const response = await proxy(requestFor(AUTH_ROUTES.login));

        expect(response.headers.get("location")).toBeNull();
    });
});
