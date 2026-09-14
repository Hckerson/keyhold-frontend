import { describe, expect, it } from "vitest";
import { AxiosError, AxiosHeaders } from "axios";
import type { AxiosResponse } from "axios";
import { NETWORK_FAILURE } from "@/lib/config/feedback";
import { errorMessage } from "@/lib/utils/api-error";

const FALLBACK = "Nothing went through.";

const answered = (message?: string | string[]) => {
    const response: AxiosResponse<{ message?: string | string[] }> = {
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: { headers: new AxiosHeaders() },
        data: { message },
    };
    return new AxiosError(
        "Request failed",
        "ERR_BAD_REQUEST",
        response.config,
        undefined,
        response,
    );
};

const unanswered = (code: string) =>
    new AxiosError("Network Error", code, { headers: new AxiosHeaders() });

describe("turning a failed request into user-facing copy", () => {
    it("surfaces the message the API sent back", () => {
        expect(errorMessage(answered("Listing already sold"), FALLBACK)).toBe(
            "Listing already sold",
        );
    });

    it("takes the first entry when the API sends a list of messages", () => {
        expect(
            errorMessage(answered(["price must be positive", "and"]), FALLBACK),
        ).toBe("price must be positive");
    });

    it("names the network as the cause when no response ever arrived", () => {
        expect(errorMessage(unanswered("ERR_NETWORK"), FALLBACK)).toBe(
            NETWORK_FAILURE,
        );
    });

    it("names the network as the cause when the request timed out", () => {
        expect(errorMessage(unanswered("ECONNABORTED"), FALLBACK)).toBe(
            NETWORK_FAILURE,
        );
    });

    it("stays on the fallback when the caller cancelled the request", () => {
        expect(errorMessage(unanswered("ERR_CANCELED"), FALLBACK)).toBe(
            FALLBACK,
        );
    });

    it("stays on the fallback for an error that is not from axios", () => {
        expect(errorMessage(new Error("boom"), FALLBACK)).toBe(FALLBACK);
    });

    it("stays on the fallback when the API answered without a message", () => {
        expect(errorMessage(answered(), FALLBACK)).toBe(FALLBACK);
    });
});
