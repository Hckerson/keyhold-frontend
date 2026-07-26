import axios from "axios";
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";
import { useAuthStore } from "@/lib/stores/auth-store";
import { deleteCookie } from "@/lib/utils/cookies";
import { ACCESS_TOKEN_COOKIE, AUTH_ROUTES } from "@/lib/constants";

const defaultConfig: AxiosRequestConfig = {
    baseURL:
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
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
    const defaultResponse: Response<T> = {
        data: [] as unknown as T,
        message: "",
        timestamp: new Date().toLocaleDateString("en-Us", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
        statusCode: 200,
    };

    try {
        const response: AxiosResponse = await apiClient.request({
            ...defaultConfig,
            ...config,
        });
        return response.data as Response<T>;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Silently catch HTTP errors - component handles via isError/isLoading
            // Uncomment to debug: console.error(error.message);
        }
        return defaultResponse;
    }
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
