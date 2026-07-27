import { isAxiosError } from "axios";

export const errorMessage = (error: unknown, fallback: string): string => {
    if (isAxiosError<{ message?: string | string[] }>(error)) {
        const message = error.response?.data?.message;
        if (Array.isArray(message) && message[0]) return message[0];
        if (typeof message === "string" && message) return message;
    }
    return fallback;
};
