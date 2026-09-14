import { isAxiosError } from "axios";
import { NETWORK_FAILURE } from "@/lib/config/feedback";

const CANCELED = "ERR_CANCELED";

export const errorMessage = (error: unknown, fallback: string): string => {
    if (isAxiosError<{ message?: string | string[] }>(error)) {
        const message = error.response?.data?.message;
        if (Array.isArray(message) && message[0]) return message[0];
        if (typeof message === "string" && message) return message;
        if (!error.response && error.code !== CANCELED) return NETWORK_FAILURE;
    }
    return fallback;
};
