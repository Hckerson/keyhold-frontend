"use client";

import { useEffect, useRef } from "react";
import { useRecordPropertyView } from "@/lib/hooks/use-properties";

const VIEWED_KEY = "viewed-listing:";

const countedThisSession = (id: string) => {
    try {
        return sessionStorage.getItem(`${VIEWED_KEY}${id}`) !== null;
    } catch {
        return false;
    }
};

const markCounted = (id: string) => {
    try {
        sessionStorage.setItem(`${VIEWED_KEY}${id}`, "1");
    } catch {
        return;
    }
};

export interface ListingViewRecorderProps {
    propertyId: string;
}

export function ListingViewRecorder({ propertyId }: ListingViewRecorderProps) {
    const { mutate } = useRecordPropertyView();
    const recorded = useRef<string | null>(null);

    useEffect(() => {
        if (recorded.current === propertyId) return;
        if (countedThisSession(propertyId)) return;

        recorded.current = propertyId;
        markCounted(propertyId);
        mutate(propertyId);
    }, [propertyId, mutate]);

    return null;
}

ListingViewRecorder.displayName = "ListingViewRecorder";
