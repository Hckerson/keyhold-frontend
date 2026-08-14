"use client";

import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import {
    AGENT_SETTINGS_FORM_ID,
    PROFILE_PUBLISHED,
} from "@/lib/data/agent-settings";
import { formatAge } from "@/lib/utils";

const SETTINGS_TITLE = "Settings";
const SETTINGS_LEDE =
    "What buyers see, what you charge, and how the desk reaches you";
const PUBLISHED_PREFIX = "Public profile · published";
const RESET_ACTION = "Reset";
const SAVE_ACTION = "Save Changes";
const SAVED_ACTION = "Saved";

export interface AgentSettingsHeaderProps {
    dirty: boolean;
    saved: boolean;
    onReset: () => void;
}

export function AgentSettingsHeader({
    dirty,
    saved,
    onReset,
}: AgentSettingsHeaderProps) {
    return (
        <PortalHeader
            title={SETTINGS_TITLE}
            lede={SETTINGS_LEDE}
            summary={`${PUBLISHED_PREFIX} ${formatAge(PROFILE_PUBLISHED.ageMinutes)} ago by ${PROFILE_PUBLISHED.actor}`}
            action={
                <>
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        disabled={!dirty}
                        onClick={onReset}
                    >
                        {RESET_ACTION}
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        form={AGENT_SETTINGS_FORM_ID}
                        disabled={!dirty}
                    >
                        {saved ? SAVED_ACTION : SAVE_ACTION}
                    </Button>
                </>
            }
        />
    );
}

AgentSettingsHeader.displayName = "AgentSettingsHeader";
