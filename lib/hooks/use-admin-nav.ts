"use client";

import { useMemo } from "react";
import { adminNav } from "@/lib/config/admin-nav";
import { useKycCounts } from "@/lib/hooks/use-kyc";

export function useAdminNav() {
    const counts = useKycCounts();

    return useMemo(
        () => adminNav(counts.data?.pending ?? 0),
        [counts.data?.pending],
    );
}
