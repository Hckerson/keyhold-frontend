"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { calendarAPI } from "@/lib/api/calendar";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import { FEEDBACK } from "@/lib/config/feedback";

export function useGoogleCalendarStatus() {
    return useQuery({
        queryKey: queryKeys.calendar.google,
        queryFn: () => calendarAPI.googleStatus(),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useDisconnectGoogleCalendar() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.disconnectGoogleCalendar,
        mutationFn: () => calendarAPI.disconnectGoogle(),
        onSuccess: (status) =>
            client.setQueryData(queryKeys.calendar.google, status),
    });
}
