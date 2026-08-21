import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/lib/stores/auth-store";
import { deleteCookie } from "@/lib/utils/cookies";
import { ACCESS_TOKEN_COOKIE, AUTH_ROUTES, config } from "@/lib/constants";

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

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().clearAuth();
            deleteCookie(ACCESS_TOKEN_COOKIE);
            if (
                typeof window !== "undefined" &&
                !window.location.pathname.startsWith(AUTH_ROUTES.login)
            ) {
                window.location.href = AUTH_ROUTES.login;
            }
        }
        return Promise.reject(error);
    },
);
