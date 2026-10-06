"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ConfigPanel } from "@/components/features/shared/config-panel";
import { NotificationRuleTable } from "@/components/features/agent/notification-rule-table";
import { IdentityVerificationPanel } from "@/components/features/settings/identity-verification-panel";
import { AgentSettingsProfileHero } from "@/components/sections/agent/agent-settings-profile-hero";
import { NOTIFICATION_RULES } from "@/lib/config/agent-account";
import {
    enabledNotificationCount,
    NOTIFICATION_RULE_COUNT,
} from "@/lib/data/agent-account";
import type { NotificationRuleId, NotificationState } from "@/lib/types";
import {
    AGENT_PROFILE_FIELDS,
    AGENT_SETTINGS_FORM_ID,
    type AgentSettingsForm,
} from "@/lib/data/agent-settings";

const PROFILE_TITLE = "Agent Profile";
const PROFILE_LEDE = "Identity buyers see beside every one of your listings";
const ROUTING_TITLE = "Alert Routing";
const ROUTING_LEDE =
    "Which channel carries each alert and how much traffic it sends";

export interface AgentSettingsMainProps {
    form: AgentSettingsForm;
    notifications: NotificationState;
    pending: number;
    strength: number;
    verified: number;
    credentials: number;
    updatedAt?: string;
    onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onNotificationToggle: (id: NotificationRuleId) => void;
    onSubmit: (event: FormEvent) => void;
}

export function AgentSettingsMain({
    form,
    notifications,
    pending,
    strength,
    verified,
    credentials,
    updatedAt,
    onFieldChange,
    onNotificationToggle,
    onSubmit,
}: AgentSettingsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <AgentSettingsProfileHero
                pending={pending}
                strength={strength}
                verified={verified}
                credentials={credentials}
                brokerage={form.brokerage}
                updatedAt={updatedAt}
                enabledAlerts={enabledNotificationCount(notifications)}
            />

            <form
                id={AGENT_SETTINGS_FORM_ID}
                onSubmit={onSubmit}
                className="flex flex-col gap-3"
            >
                <ConfigPanel
                    title={PROFILE_TITLE}
                    description={PROFILE_LEDE}
                    fields={AGENT_PROFILE_FIELDS}
                    values={form}
                    onChange={onFieldChange}
                />
            </form>

            <Panel
                title={ROUTING_TITLE}
                description={ROUTING_LEDE}
                count={`${enabledNotificationCount(notifications)}/${NOTIFICATION_RULE_COUNT}`}
            >
                <PanelInset scroll>
                    <NotificationRuleTable
                        rules={NOTIFICATION_RULES}
                        state={notifications}
                        onToggle={onNotificationToggle}
                    />
                </PanelInset>
            </Panel>

            <IdentityVerificationPanel />
        </div>
    );
}

AgentSettingsMain.displayName = "AgentSettingsMain";
