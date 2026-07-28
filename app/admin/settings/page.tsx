"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { FormField } from "@/components/ui/form-field";
import { ToggleRow } from "@/components/ui/toggle-row";
import { ActionRow } from "@/components/ui/action-row";
import { Callout } from "@/components/ui/callout";

interface ConfigField {
    name: keyof typeof INITIAL_CONFIG;
    label: string;
    placeholder: string;
    type?: string;
    prefix?: string;
    suffix?: string;
}

const INITIAL_CONFIG = {
    platformName: "Luxury Estates",
    supportEmail: "support@luxuryestates.com",
    baseCurrency: "USD",
    timezone: "America/Los_Angeles",
    commissionRate: "2.5",
    platformFee: "495",
    listingExpiryDays: "90",
    maxPhotosPerListing: "24",
    autoApproveThreshold: "1000000",
    escrowHoldDays: "3",
};

const PLATFORM_FIELDS: ConfigField[] = [
    {
        name: "platformName",
        label: "Platform Name",
        placeholder: "Luxury Estates",
    },
    {
        name: "supportEmail",
        label: "Support Email",
        placeholder: "support@luxuryestates.com",
        type: "email",
    },
    { name: "baseCurrency", label: "Base Currency", placeholder: "USD" },
    {
        name: "timezone",
        label: "Reporting Timezone",
        placeholder: "America/Los_Angeles",
    },
];

const MARKETPLACE_FIELDS: ConfigField[] = [
    {
        name: "commissionRate",
        label: "Commission Rate",
        placeholder: "2.5",
        suffix: "%",
    },
    {
        name: "platformFee",
        label: "Listing Fee",
        placeholder: "495",
        prefix: "$",
    },
    {
        name: "listingExpiryDays",
        label: "Listing Expiry",
        placeholder: "90",
        suffix: "days",
    },
    {
        name: "maxPhotosPerListing",
        label: "Max Photos Per Listing",
        placeholder: "24",
    },
    {
        name: "autoApproveThreshold",
        label: "Auto-Approve Below",
        placeholder: "1000000",
        prefix: "$",
    },
    {
        name: "escrowHoldDays",
        label: "Escrow Hold",
        placeholder: "3",
        suffix: "days",
    },
];

const MODERATION_TOGGLES = [
    {
        title: "Automatic Photo Scanning",
        description: "Flag listings whose images fail the content scan",
        defaultChecked: true,
    },
    {
        title: "Require Agent License Verification",
        description: "Block publishing until a license is on file",
        defaultChecked: true,
    },
    {
        title: "Manual Review Above Threshold",
        description: "Route high-value listings to a human moderator",
        defaultChecked: true,
    },
    {
        title: "Auto-Suspend On Repeat Rejections",
        description: "Suspend an agent after three rejected listings",
        defaultChecked: false,
    },
];

const OPERATIONS_TOGGLES = [
    {
        title: "Maintenance Mode",
        description: "Take the marketplace offline for everyone but admins",
        defaultChecked: false,
    },
    {
        title: "New Signups",
        description: "Allow buyers and agents to create accounts",
        defaultChecked: true,
    },
    {
        title: "Daily Health Digest",
        description: "Email uptime and error-rate summaries to admins",
        defaultChecked: true,
    },
    {
        title: "Payout Automation",
        description: "Release agent commissions once escrow clears",
        defaultChecked: true,
    },
];

export default function AdminSettingsPage() {
    const [config, setConfig] = useState(INITIAL_CONFIG);
    const [saved, setSaved] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConfig((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSaved(true);
    };

    const handleReset = () => {
        setConfig(INITIAL_CONFIG);
        setSaved(false);
    };

    const renderFields = (fields: ConfigField[]) =>
        fields.map((field) => (
            <FormField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type ?? "text"}
                value={config[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                prefix={field.prefix}
                endSlot={
                    field.suffix ? (
                        <span className="text-text-muted text-xs">
                            {field.suffix}
                        </span>
                    ) : undefined
                }
            />
        ));

    return (
        <div className="max-w-3xl space-y-3">
            <PageHeader
                title="System Settings"
                description="Platform configuration, marketplace rules, and moderation policy"
                action={
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            type="button"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            type="submit"
                            form="admin-settings-form"
                        >
                            {saved ? "Saved" : "Save Changes"}
                        </Button>
                    </div>
                }
            />

            {saved && (
                <Callout
                    variant="success"
                    title="Configuration saved"
                    description="New values apply to listings and payouts created from now on."
                />
            )}

            <form
                id="admin-settings-form"
                onSubmit={handleSubmit}
                className="space-y-3"
            >
                <Panel
                    title="Platform"
                    description="Identity and defaults used across every surface"
                >
                    <div className="grid gap-3 sm:grid-cols-2">
                        {renderFields(PLATFORM_FIELDS)}
                    </div>
                </Panel>

                <Panel
                    title="Marketplace Rules"
                    description="Fees, limits, and thresholds applied to new listings"
                >
                    <div className="grid gap-3 sm:grid-cols-2">
                        {renderFields(MARKETPLACE_FIELDS)}
                    </div>
                </Panel>
            </form>

            <Panel
                title="Moderation Policy"
                description="How listings and agents are screened"
            >
                <div className="space-y-2">
                    {MODERATION_TOGGLES.map((item) => (
                        <ToggleRow
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            defaultChecked={item.defaultChecked}
                        />
                    ))}
                </div>
            </Panel>

            <Panel
                title="Operations"
                description="Availability, signups, and automated payouts"
            >
                <div className="space-y-2">
                    {OPERATIONS_TOGGLES.map((item) => (
                        <ToggleRow
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            defaultChecked={item.defaultChecked}
                        />
                    ))}
                </div>
            </Panel>

            <Panel
                title="Maintenance"
                description="Operations that affect the entire platform"
            >
                <div className="space-y-2">
                    <ActionRow
                        title="Rotate API Keys"
                        description="Issue new server keys and revoke the current pair"
                        action={
                            <Button variant="secondary" size="sm">
                                Rotate
                            </Button>
                        }
                    />
                    <ActionRow
                        title="Export Audit Log"
                        description="Download every moderation and payout action"
                        action={
                            <Button variant="secondary" size="sm">
                                Export
                            </Button>
                        }
                    />
                    <ActionRow
                        danger
                        title="Purge Listing Cache"
                        description="Force a full re-index of the public marketplace"
                        action={
                            <Button variant="outline-danger" size="sm">
                                Purge
                            </Button>
                        }
                    />
                </div>
            </Panel>
        </div>
    );
}
