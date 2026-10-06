"use client";

import { useState } from "react";
import { MAINTENANCE_ACTIONS } from "@/lib/config/admin-settings";
import type { MaintenanceActionId } from "@/lib/types";
import {
    usePurgeExpiredVerifications,
    useRestorePlatformDefaults,
} from "@/lib/hooks/use-platform-settings";

export function useMaintenanceRun(onRestored: () => void) {
    const restoreDefaults = useRestorePlatformDefaults();
    const purgeVerifications = usePurgeExpiredVerifications();
    const [selectedId, setSelectedId] = useState<MaintenanceActionId>();

    const mutations = {
        "restore-defaults": restoreDefaults,
        "purge-verifications": purgeVerifications,
    };

    const running = MAINTENANCE_ACTIONS.find(
        (action) => mutations[action.id].isPending,
    )?.id;

    const action =
        MAINTENANCE_ACTIONS.find((entry) => entry.id === selectedId) ?? null;

    const request = (id: MaintenanceActionId) => {
        if (running) return;
        mutations[id].reset();
        setSelectedId(id);
    };

    const dismiss = () => {
        if (!running) setSelectedId(undefined);
    };

    const completion = (id: MaintenanceActionId) => () => {
        setSelectedId(undefined);
        if (id === "restore-defaults") onRestored();
    };

    const confirm = () => {
        if (!selectedId || running) return;
        const onSuccess = completion(selectedId);
        if (selectedId === "restore-defaults")
            restoreDefaults.mutate(undefined, { onSuccess });
        else purgeVerifications.mutate(undefined, { onSuccess });
    };

    return {
        action,
        running,
        pending: running !== undefined,
        failed: selectedId ? mutations[selectedId].isError : false,
        request,
        dismiss,
        confirm,
    };
}
