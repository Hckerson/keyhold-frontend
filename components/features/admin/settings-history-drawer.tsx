"use client";

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { SettingChangeList } from "@/components/features/admin/setting-change-list";
import { SETTINGS_COPY } from "@/lib/data/admin-settings";
import type { SettingChange } from "@/lib/types";

export interface SettingsHistoryDrawerProps {
    open: boolean;
    changes: SettingChange[];
    onOpenChange: (open: boolean) => void;
}

export function SettingsHistoryDrawer({
    open,
    changes,
    onOpenChange,
}: SettingsHistoryDrawerProps) {
    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            label={SETTINGS_COPY.historyTitle}
            size="sm"
        >
            <DrawerHeader>
                <DrawerTitle>{SETTINGS_COPY.historyTitle}</DrawerTitle>
                <p className="text-text-muted mt-0.5 text-xs">
                    {SETTINGS_COPY.historyLede}
                </p>
            </DrawerHeader>
            <DrawerBody>
                <SettingChangeList changes={changes} />
            </DrawerBody>
        </Drawer>
    );
}

SettingsHistoryDrawer.displayName = "SettingsHistoryDrawer";
