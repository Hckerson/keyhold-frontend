import { MutationCache, QueryClient } from "@tanstack/react-query";
import { GENERIC_FAILURE } from "@/lib/config/feedback";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import { notify } from "@/lib/stores/toast-store";
import { errorMessage, isUnauthorized } from "@/lib/utils/api-error";
import type { MutationFeedback } from "@/lib/config/feedback";

const RETRY_LIMIT = 1;

const retryUnlessExpired = (failureCount: number, error: unknown) =>
    !isUnauthorized(error) && failureCount < RETRY_LIMIT;

const reportSuccess = (meta?: MutationFeedback) => {
    if (!meta?.success) return;
    notify({ tone: "success", title: meta.success });
};

const reportError = (error: unknown, meta?: MutationFeedback) => {
    if (meta?.silentError) return;
    const title = meta?.error ?? GENERIC_FAILURE;
    const detail = errorMessage(error, "");
    notify({
        tone: "error",
        title,
        description: detail && detail !== title ? detail : undefined,
    });
};

export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: STALE_TIME,
                gcTime: CACHE_TIME,
                refetchOnWindowFocus: false,
                retry: retryUnlessExpired,
            },
            mutations: {
                retry: retryUnlessExpired,
            },
        },
        mutationCache: new MutationCache({
            onSuccess: (_data, _variables, _context, mutation) =>
                reportSuccess(mutation.meta),
            onError: (error, _variables, _context, mutation) =>
                reportError(error, mutation.meta),
        }),
    });
