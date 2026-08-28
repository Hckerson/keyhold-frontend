"use client";

import type { ChangeEvent, FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ConfigPanel } from "@/components/features/shared/config-panel";
import { PolicySwitchTable } from "@/components/features/admin/policy-switch-table";
import { AdminSettingsPostureHero } from "@/components/sections/admin/admin-settings-posture-hero";
import {
    blockingPolicyCount,
    enabledPolicyCount,
    POLICY_COUNT,
    POLICY_SWITCHES,
} from "@/lib/data/admin-policies";
import {
    MARKETPLACE_FIELDS,
    PLATFORM_FIELDS,
    SETTINGS_FORM_ID,
    type AdminConfig,
} from "@/lib/data/admin-settings";
import type { ConfigChange, PolicyState, PolicySwitchId } from "@/lib/types";

const PLATFORM_TITLE = "Platform";
const PLATFORM_LEDE = "Identity and defaults used across every surface";
const MARKETPLACE_TITLE = "Marketplace Rules";
const MARKETPLACE_LEDE = "Fees, limits, and thresholds applied to new listings";
const POLICY_TITLE = "Policy Enforcement";
const POLICY_LEDE =
    "What each rule blocks and how much of the market it covers";

export interface AdminSettingsMainProps {
    config: AdminConfig;
    policies: PolicyState;
    pending: number;
    onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onPolicyToggle: (id: PolicySwitchId) => void;
    onSubmit: (event: FormEvent) => void;
    lastChange?: ConfigChange;
}

export function AdminSettingsMain({
    config,
    policies,
    pending,
    onFieldChange,
    onPolicyToggle,
    onSubmit,
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
                />

                <ConfigPanel
                    title={MARKETPLACE_TITLE}
                    description={MARKETPLACE_LEDE}
                    fields={MARKETPLACE_FIELDS}
                    values={config}
                    onChange={onFieldChange}
                />
            </form>

            <Panel
                title={POLICY_TITLE}
                description={POLICY_LEDE}
                count={`${enabledPolicyCount(policies)}/${POLICY_COUNT}`}
            >
                <PanelInset scroll>
                    <PolicySwitchTable
                        policies={POLICY_SWITCHES}
                        state={policies}
                        onToggle={onPolicyToggle}
                    />
                </PanelInset>
            </Panel>
        </div>
    );
}

AdminSettingsMain.displayName = "AdminSettingsMain";
