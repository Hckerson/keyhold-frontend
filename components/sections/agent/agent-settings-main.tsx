"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ConfigPanel } from "@/components/features/settings/config-panel";
import { NotificationRuleTable } from "@/components/features/agent/notification-rule-table";
import { AgentSettingsProfileHero } from "@/components/sections/agent/agent-settings-profile-hero";
import {
    enabledNotificationCount,
    NOTIFICATION_RULE_COUNT,
    NOTIFICATION_RULES,
    weeklyAlertVolume,
    type NotificationRuleId,
    type NotificationState,
} from "@/lib/data/agent-account";
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
                weeklySends={weeklyAlertVolume(notifications)}
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
        </div>
    );
}

AgentSettingsMain.displayName = "AgentSettingsMain";
