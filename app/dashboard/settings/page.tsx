"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { FormField } from "@/components/ui/form-field";
import { ToggleRow } from "@/components/ui/toggle-row";
import { ActionRow } from "@/components/ui/action-row";

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        email: "john@example.com",
        phone: "(310) 555-0123",
        preferredLocation: "Beverly Hills, CA",
        budgetMin: "2500000",
        budgetMax: "5000000",
    });
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

    return (
        <div className="max-w-2xl space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your profile and preferences"
            />

            <Panel
                title="Profile Information"
                description="Update your personal details"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                        <FormField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                        <FormField
                            label="Phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(310) 555-0123"
                        />
                        <FormField
                            label="Preferred Location"
                            name="preferredLocation"
                            value={formData.preferredLocation}
                            onChange={handleChange}
                            placeholder="Beverly Hills, CA"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" type="submit">
                            {saved ? "Saved!" : "Save Changes"}
                        </Button>
                        <Button variant="secondary" size="sm" type="button">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Panel>

            <Panel
                title="Property Preferences"
                description="Set your budget and search criteria"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            label="Minimum Budget"
                            name="budgetMin"
                            value={formData.budgetMin}
                            onChange={handleChange}
                            placeholder="2,500,000"
                            prefix="$"
                        />
                        <FormField
                            label="Maximum Budget"
                            name="budgetMax"
                            value={formData.budgetMax}
                            onChange={handleChange}
                            placeholder="5,000,000"
                            prefix="$"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" type="submit">
                            {saved ? "Saved!" : "Save Preferences"}
                        </Button>
                        <Button variant="secondary" size="sm" type="button">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Panel>

            <Panel
                title="Notification Settings"
                description="Control how you receive updates"
            >
                <div className="space-y-2">
                    <ToggleRow
                        title="Email Notifications"
                        description="Receive alerts via email"
                        defaultChecked
                    />
                    <ToggleRow
                        title="SMS Notifications"
                        description="Receive alerts via text message"
                    />
                    <ToggleRow
                        title="In-App Notifications"
                        description="See updates in your dashboard"
                        defaultChecked
                    />
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
                        description="Permanently delete your account and data"
                        action={
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-error hover:text-error"
                            >
                                Delete
                            </Button>
                        }
                    />
                </div>
            </Panel>
        </div>
    );
}
