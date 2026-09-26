"use client";

import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { AGENT_SETTINGS_FORM_ID } from "@/lib/data/agent-settings";
import { formatAge } from "@/lib/utils";
import { minutesSince } from "@/lib/utils/elapsed";

const SETTINGS_TITLE = "Settings";
const SETTINGS_LEDE =
    "What buyers see, what you charge, and how the desk reaches you";
const PUBLISHED_PREFIX = "Public profile · saved";
const NEVER_SAVED = "Public profile · not saved yet";
const RESET_ACTION = "Reset";
const SAVE_ACTION = "Save Changes";
const SAVED_ACTION = "Saved";

export interface AgentSettingsHeaderProps {
    dirty: boolean;
    saved: boolean;
    saving: boolean;
    updatedAt?: string;
    onReset: () => void;
}

export function AgentSettingsHeader({
    dirty,
    saved,
    saving,
    updatedAt,
    onReset,
}: AgentSettingsHeaderProps) {
    return (
        <PortalHeader
            title={SETTINGS_TITLE}
            lede={SETTINGS_LEDE}
            summary={
                updatedAt
                    ? `${PUBLISHED_PREFIX} ${formatAge(minutesSince(updatedAt))} ago`
                    : NEVER_SAVED
            }
            action={
                <>
                    <Button type="button" disabled={!dirty} onClick={onReset}>
                        {RESET_ACTION}
                    </Button>
                    <Button
                        type="submit"
                        emphasis="solid"
                        tone="accent"
                        form={AGENT_SETTINGS_FORM_ID}
                        disabled={!dirty}
                        isLoading={saving}
                    >
                        {saved ? SAVED_ACTION : SAVE_ACTION}
                    </Button>
                </>
            }
        />
    );
}

AgentSettingsHeader.displayName = "AgentSettingsHeader";
