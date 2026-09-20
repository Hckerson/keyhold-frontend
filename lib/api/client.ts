import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/lib/stores/auth-store";
import { isUnauthorized } from "@/lib/utils/api-error";
import {
    config,
    isPortalPath,
    loginExpired,
    REQUEST_TIMEOUT,
} from "@/lib/constants";

type ParamValue = string | number | boolean;

const isParamValue = (value: unknown): value is ParamValue =>
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean";

const serializeParams = (params: Record<string, unknown>) => {
    const search = new URLSearchParams();

    const append = (key: string, value: unknown) => {
        if (isParamValue(value)) search.append(key, String(value));
    };

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((entry) => append(key, entry));
            return;
        }
        append(key, value);
    });

    return search.toString();
};

const defaultConfig: AxiosRequestConfig = {
    baseURL: config.api.base,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: serializeParams,
    withCredentials: true,
    timeout: REQUEST_TIMEOUT,
};

export interface ApiEnvelope<T> {
    data: T;
    message: string;
    timestamp: string;
    statusCode: number;
}

export const apiClient: AxiosInstance = axios.create(defaultConfig);

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.request<ApiEnvelope<T>>(config);
    return response.data.data;
};

export const query = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        request<T>({ method: "GET", url, ...config }),
    post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
        request<T>({ method: "POST", url, data: body, ...config }),
    patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
        request<T>({ method: "PATCH", url, data: body, ...config }),
    put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
        request<T>({ method: "PUT", url, data: body, ...config }),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        request<T>({ method: "DELETE", url, ...config }),
};

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (isUnauthorized(error)) {
            useAuthStore.getState().clearAuth();

            const pathname =
                typeof window === "undefined" ? "" : window.location.pathname;

            if (isPortalPath(pathname))
                window.location.href = loginExpired(pathname);
        }
        return Promise.reject(error);
    },
);
