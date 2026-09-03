"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type UrlParamValue = string | string[] | number | undefined;

export interface UrlStateCodec<T> {
    fromParams: (params: URLSearchParams) => T;
    toParams: (value: T) => Record<string, UrlParamValue>;
}

export interface UrlStateOptions {
    history?: "push" | "replace";
}

const serialise = (value: UrlParamValue): string | null => {
    if (value === undefined || value === "") return null;
    if (Array.isArray(value)) return value.length ? value.join(",") : null;
    return String(value);
};

export function readList(params: URLSearchParams, key: string): string[] {
    const raw = params.get(key);
    return raw ? raw.split(",").filter(Boolean) : [];
}

export function readNumber(
    params: URLSearchParams,
    key: string,
    fallback: number,
): number {
    const parsed = Number(params.get(key));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function readOneOf<T extends string>(
    params: URLSearchParams,
    key: string,
    allowed: readonly T[],
    fallback: T,
): T {
    const raw = params.get(key);
    return allowed.includes(raw as T) ? (raw as T) : fallback;
}

export function useUrlState<T>(
    codec: UrlStateCodec<T>,
    { history = "push" }: UrlStateOptions = {},
) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const search = searchParams.toString();

    const value = useMemo(
        () => codec.fromParams(new URLSearchParams(search)),
        [codec, search],
    );

    const setValue = useCallback(
        (next: T) => {
            const params = new URLSearchParams();

            for (const [key, entry] of Object.entries(codec.toParams(next))) {
                const serialised = serialise(entry);
                if (serialised !== null) params.set(key, serialised);
            }

            const query = params.toString();
            const url = query ? `${pathname}?${query}` : pathname;

            if (history === "replace") router.replace(url, { scroll: false });
            else router.push(url, { scroll: false });
        },
        [codec, history, pathname, router],
    );

    return [value, setValue] as const;
}
