import { isAxiosError } from "axios";
import { NETWORK_FAILURE } from "@/lib/config/feedback";

const CANCELED = "ERR_CANCELED";
const UNAUTHORIZED = 401;

export const isUnauthorized = (error: unknown): boolean =>
    isAxiosError(error) && error.response?.status === UNAUTHORIZED;

export const errorMessage = (error: unknown, fallback: string): string => {
    if (isAxiosError<{ message?: string | string[] }>(error)) {
        const message = error.response?.data?.message;
        if (Array.isArray(message) && message[0]) return message[0];
        if (typeof message === "string" && message) return message;
        if (!error.response && error.code !== CANCELED) return NETWORK_FAILURE;
    }
    return fallback;
};

export const responseStatus = (error: unknown): number | undefined =>
    isAxiosError(error) ? error.response?.status : undefined;
