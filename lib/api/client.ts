import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/lib/stores/auth-store";
import { deleteCookie } from "@/lib/utils/cookies";
import { ACCESS_TOKEN_COOKIE, AUTH_ROUTES, config } from "@/lib/constants";

const defaultConfig: AxiosRequestConfig = {
    baseURL: config.api.base,
    headers: {
        "Content-Type": "application/json",
    },
};

interface Response<T> {
    data: T;
    message: string;
    timestamp: string;
    statusCode: number;
}

export const apiClient: AxiosInstance = axios.create(defaultConfig);

const request = async <T>(config: AxiosRequestConfig): Promise<Response<T>> => {
    const response = await apiClient.request<Response<T>>(config);
    return response.data;
};

export const query = {
    get: async <T>(url: string, config?: AxiosRequestConfig) => {
        return await request<T>({ method: "GET", url, ...config });
    },
    post: async <T>(
        url: string,
        body: unknown,
        config?: AxiosRequestConfig,
    ) => {
        return await request<T>({ method: "POST", url, data: body, ...config });
    },
    patch: async <T>(
        url: string,
        body: unknown,
        config?: AxiosRequestConfig,
    ) => {
        return await request<T>({
            method: "PATCH",
            url,
            data: body,
            ...config,
        });
    },
    put: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) => {
        return await request<T>({ method: "PUT", url, data: body, ...config });
    },
    delete: async <T>(url: string, config?: AxiosRequestConfig) => {
        return await request<T>({ method: "DELETE", url, ...config });
    },
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
