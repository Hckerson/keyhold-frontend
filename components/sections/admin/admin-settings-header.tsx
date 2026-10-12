"use client";

import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { SETTINGS_COPY } from "@/lib/data/admin-settings";

export interface AdminSettingsHeaderProps {
    summary?: string;
    onHistory?: () => void;
}

export function AdminSettingsHeader({
    summary,
    onHistory,
}: AdminSettingsHeaderProps) {
    return (
        <PortalHeader
            title={SETTINGS_COPY.title}
            lede={SETTINGS_COPY.lede}
            summary={summary}
            action={
                onHistory && (
                    <Button
                        type="button"
                        emphasis="outline"
                        onClick={onHistory}
                    >
                        <History
                            size={12}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        {SETTINGS_COPY.history}
                    </Button>
                )
            }
        />
    );
}

AdminSettingsHeader.displayName = "AdminSettingsHeader";
