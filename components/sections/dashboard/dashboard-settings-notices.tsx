"use client";

import type { ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { COLLAPSE_MOTION } from "@/lib/config/motion";

const SAVED_TITLE = "Preferences saved";
const SAVED_LEDE = "New matches and alerts follow these settings from now on.";
const PASSWORD_TITLE = "Password updated";
const PASSWORD_LEDE = "Use your new password the next time you sign in.";
const DELETION_TITLE = "Account scheduled for deletion";
const DELETION_LEDE =
    "Your data will be removed in 30 days. Restore it any time before then.";
const RESTORE_ACTION = "Restore account";

interface SettingsNotice {
    id: string;
    variant: "success" | "error";
    title: string;
    description: string;
    action?: ReactNode;
}

export interface DashboardSettingsNoticesProps {
    saved: boolean;
    passwordUpdated: boolean;
    deletionScheduled: boolean;
    onRestore: () => void;
}

export function DashboardSettingsNotices({
    saved,
    passwordUpdated,
    deletionScheduled,
    onRestore,
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

    if (passwordUpdated) {
        notices.push({
            id: "password",
            variant: "success",
            title: PASSWORD_TITLE,
            description: PASSWORD_LEDE,
        });
    }

    if (deletionScheduled) {
        notices.push({
            id: "deletion",
            variant: "error",
            title: DELETION_TITLE,
            description: DELETION_LEDE,
            action: (
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onRestore}
                >
                    {RESTORE_ACTION}
                </Button>
            ),
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
                        action={notice.action}
                    />
                </m.div>
            ))}
        </AnimatePresence>
    );
}

DashboardSettingsNotices.displayName = "DashboardSettingsNotices";
