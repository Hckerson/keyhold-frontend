"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { FormField } from "@/components/ui/form-field";
import { ToggleRow } from "@/components/ui/toggle-row";
import { ActionRow } from "@/components/ui/action-row";

const PROFILE_FIELDS = [
    { name: "fullName", label: "Full Name", placeholder: "Sarah Mitchell" },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "sarah@agentpro.com",
    },
    {
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "(310) 555-0180",
    },
    { name: "brokerage", label: "Brokerage", placeholder: "Agent Pro Realty" },
    { name: "license", label: "License Number", placeholder: "DRE #01987654" },
    {
        name: "serviceArea",
        label: "Service Area",
        placeholder: "Beverly Hills, CA",
    },
] as const;

const BUSINESS_FIELDS = [
    {
        name: "commissionRate",
        label: "Commission Rate",
        placeholder: "2.5",
        suffix: "%",
    },
    {
        name: "responseTime",
        label: "Lead Response Target",
        placeholder: "2",
        suffix: "hours",
    },
] as const;

const NOTIFICATIONS = [
    {
        title: "New Lead Alerts",
        description: "Notify me the moment an inquiry arrives",
        defaultChecked: true,
    },
    {
        title: "Offer Activity",
        description: "Offers, counters, and acceptances on my listings",
        defaultChecked: true,
    },
    {
        title: "Showing Reminders",
        description: "Reminders one hour before each appointment",
        defaultChecked: true,
    },
    {
        title: "Weekly Performance Digest",
        description: "Views, saves, and pipeline movement every Monday",
        defaultChecked: false,
    },
];

const initialForm = {
    fullName: "Sarah Mitchell",
    email: "sarah@agentpro.com",
    phone: "(310) 555-0180",
    brokerage: "Agent Pro Realty",
    license: "DRE #01987654",
    serviceArea: "Beverly Hills, CA",
    commissionRate: "2.5",
    responseTime: "2",
};

export default function AgentSettingsPage() {
    const [formData, setFormData] = useState(initialForm);
    const [saved, setSaved] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleReset = () => setFormData(initialForm);

    return (
        <div className="max-w-2xl space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your agent profile and preferences"
            />

            <Panel
                title="Agent Profile"
                description="Details buyers see on your listings"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                        {PROFILE_FIELDS.map((field) => (
                            <FormField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={"type" in field ? field.type : "text"}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="primary" size="sm" type="submit">
                            {saved ? "Saved!" : "Save Changes"}
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            type="button"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </Panel>

            <Panel
                title="Business Preferences"
                description="Defaults applied to new listings and leads"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                        {BUSINESS_FIELDS.map((field) => (
                            <FormField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                endSlot={
                                    <span className="text-text-muted text-xs">
                                        {field.suffix}
                                    </span>
                                }
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="primary" size="sm" type="submit">
                            {saved ? "Saved!" : "Save Preferences"}
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            type="button"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </Panel>

            <Panel
                title="Notifications"
                description="Control how you receive pipeline updates"
            >
                <div className="space-y-2">
                    {NOTIFICATIONS.map((item) => (
                        <ToggleRow
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            defaultChecked={item.defaultChecked}
                        />
                    ))}
                </div>
            </Panel>

            <Panel title="Account" description="Manage your account security">
                <div className="space-y-2">
                    <ActionRow
                        title="Change Password"
                        description="Update your password regularly"
                        action={
                            <Button variant="secondary" size="sm">
                                Change
                            </Button>
                        }
                    />
                    <ActionRow
                        title="Two-Factor Authentication"
                        description="Add an extra layer of security"
                        action={
                            <Button variant="secondary" size="sm">
                                Enable
                            </Button>
                        }
                    />
                    <ActionRow
                        danger
                        title="Delete Account"
                        description="Permanently delete your account and listings"
                        action={
                            <Button variant="outline-danger" size="sm">
                                Delete
                            </Button>
                        }
                    />
                </div>
            </Panel>
        </div>
    );
}
