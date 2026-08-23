"use client";

import { AnimatePresence, m } from "motion/react";
import { Callout } from "@/components/ui/callout";
import { COLLAPSE_MOTION } from "@/lib/config/motion";

const SAVED_TITLE = "Preferences saved";
const SAVED_LEDE = "New matches and alerts follow these settings from now on.";
const RESET_TITLE = "Reset link sent";
const RESET_LEDE = "Check your inbox to finish changing your password.";

interface SettingsNotice {
    id: string;
    variant: "success" | "error";
    title: string;
    description: string;
}

export interface DashboardSettingsNoticesProps {
    saved: boolean;
    resetSent: boolean;
}

export function DashboardSettingsNotices({
    saved,
    resetSent,
}: DashboardSettingsNoticesProps) {
    const notices: SettingsNotice[] = [];

    if (saved) {
        notices.push({
            id: "saved",
            variant: "success",
            title: SAVED_TITLE,
            description: SAVED_LEDE,
        });
    }

    if (resetSent) {
        notices.push({
            id: "reset",
            variant: "success",
            title: RESET_TITLE,
            description: RESET_LEDE,
        });
    }

    return (
        <AnimatePresence initial={false}>
            {notices.map((notice) => (
                <m.div
                    key={notice.id}
                    {...COLLAPSE_MOTION}
                    className="overflow-hidden"
                >
                    <Callout
                        variant={notice.variant}
                        title={notice.title}
                        description={notice.description}
                    />
                </m.div>
            ))}
        </AnimatePresence>
    );
}

DashboardSettingsNotices.displayName = "DashboardSettingsNotices";
