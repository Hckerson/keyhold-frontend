"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ConfigPanel } from "@/components/features/shared/config-panel";
import { PolicySwitchTable } from "@/components/features/admin/policy-switch-table";
import { MaintenancePanel } from "@/components/features/admin/maintenance-panel";
import { AdminSettingsPostureHero } from "@/components/sections/admin/admin-settings-posture-hero";
import { POLICY_GROUPS } from "@/lib/config/settings-tones";
import {
    blockingPolicyCount,
    enabledInGroup,
    enabledPolicyCount,
    policiesInGroup,
} from "@/lib/data/admin-policies";
import {
    MARKETPLACE_FIELDS,
    PLATFORM_FIELDS,
    SETTINGS_FORM_ID,
    type AdminConfig,
    type AdminConfigKey,
    type MaintenanceActionId,
} from "@/lib/data/admin-settings";
import type {
    ConfigChange,
    PolicyGroup,
    PolicyState,
    PolicySwitchId,
} from "@/lib/types";

const PLATFORM_TITLE = "Platform";
const PLATFORM_LEDE = "Identity and defaults used across every surface";
const MARKETPLACE_TITLE = "Marketplace Rules";
const MARKETPLACE_LEDE = "Fees, limits, and thresholds applied to new listings";
const POLICY_GROUP_ORDER: PolicyGroup[] = ["moderation", "operations"];

export interface AdminSettingsMainProps {
    config: AdminConfig;
    policies: PolicyState;
    pending: number;
    maintenancePending?: MaintenanceActionId;
    onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onFieldSelect: (name: AdminConfigKey, value: string) => void;
    onPolicyToggle: (id: PolicySwitchId) => void;
    onSubmit: (event: FormEvent) => void;
    onMaintenanceRun: (id: MaintenanceActionId) => void;
    lastChange?: ConfigChange;
}

export function AdminSettingsMain({
    config,
    policies,
    pending,
    maintenancePending,
    onFieldChange,
    onFieldSelect,
    onPolicyToggle,
    onSubmit,
    onMaintenanceRun,
    lastChange,
}: AdminSettingsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <AdminSettingsPostureHero
                pending={pending}
                enabled={enabledPolicyCount(policies)}
                blocking={blockingPolicyCount(policies)}
                lastChange={lastChange}
            />

            <form
                id={SETTINGS_FORM_ID}
                onSubmit={onSubmit}
                className="flex flex-col gap-3"
            >
                <ConfigPanel
                    title={PLATFORM_TITLE}
                    description={PLATFORM_LEDE}
                    fields={PLATFORM_FIELDS}
                    values={config}
                    onChange={onFieldChange}
                    onSelect={onFieldSelect}
                />

                <ConfigPanel
                    title={MARKETPLACE_TITLE}
                    description={MARKETPLACE_LEDE}
                    fields={MARKETPLACE_FIELDS}
                    values={config}
                    onChange={onFieldChange}
                />
            </form>

            {POLICY_GROUP_ORDER.map((group) => {
                const members = policiesInGroup(group);

                return (
                    <Panel
                        key={group}
                        title={POLICY_GROUPS[group].title}
                        description={POLICY_GROUPS[group].lede}
                        count={`${enabledInGroup(policies, group)}/${members.length}`}
                    >
                        <PanelInset scroll>
                            <PolicySwitchTable
                                policies={members}
                                state={policies}
                                onToggle={onPolicyToggle}
                            />
                        </PanelInset>
                    </Panel>
                );
            })}

            <MaintenancePanel
                pending={maintenancePending}
                onRun={onMaintenanceRun}
            />
        </div>
    );
}

AdminSettingsMain.displayName = "AdminSettingsMain";
