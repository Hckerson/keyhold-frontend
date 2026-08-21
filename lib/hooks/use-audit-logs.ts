"use client";

import { useQuery } from "@tanstack/react-query";
import { auditLogsAPI } from "@/lib/api/audit-logs";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type { AuditLogQuery } from "@/lib/validations/audit-log";

export function useAuditLogs(input: AuditLogQuery = {}, enabled = true) {
    return useQuery({
        queryKey: queryKeys.auditLogs.list(input),
        queryFn: () => auditLogsAPI.list(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}
