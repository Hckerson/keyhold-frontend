import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { AuditLogPage, AuditLogQuery } from "@/lib/validations/audit-log";

export const auditLogsAPI = {
    list: (input: AuditLogQuery = {}) =>
        query.get<AuditLogPage>(config.api.auditLogs.list, { params: input }),
};
