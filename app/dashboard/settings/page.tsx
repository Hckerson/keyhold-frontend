"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h1 className="text-h3 font-display text-text font-light">
                    Settings
                </h1>
                <p className="text-text-secondary mt-2">
                    Manage your profile and preferences
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your personal details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-text text-sm font-medium">
                                    Full Name
                                </label>
                                <Input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-text text-sm font-medium">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-text text-sm font-medium">
                                    Phone
                                </label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="(310) 555-0123"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-text text-sm font-medium">
                                    Preferred Location
                                </label>
                                <Input
                                    type="text"
                                    name="preferredLocation"
                                    value={formData.preferredLocation}
                                    onChange={handleChange}
                                    placeholder="Beverly Hills, CA"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="primary" type="submit">
                                {saved ? "Saved!" : "Save Changes"}
                            </Button>
                            <Button variant="secondary" type="button">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Property Preferences</CardTitle>
                    <CardDescription>
                        Set your budget and search criteria
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-text text-sm font-medium">
                                    Minimum Budget
                                </label>
                                <div className="relative">
                                    <span className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2">
                                        $
                                    </span>
                                    <Input
                                        type="text"
                                        name="budgetMin"
                                        value={formData.budgetMin}
                                        onChange={handleChange}
                                        placeholder="2,500,000"
                                        className="pl-8"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-text text-sm font-medium">
                                    Maximum Budget
                                </label>
                                <div className="relative">
                                    <span className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2">
                                        $
                                    </span>
                                    <Input
                                        type="text"
                                        name="budgetMax"
                                        value={formData.budgetMax}
                                        onChange={handleChange}
                                        placeholder="5,000,000"
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="primary" type="submit">
                                {saved ? "Saved!" : "Save Preferences"}
                            </Button>
                            <Button variant="secondary" type="button">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                        Control how you receive updates
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-primary-dark flex items-center justify-between rounded-lg p-4">
                        <div>
                            <p className="text-text text-sm font-medium">
                                Email Notifications
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                Receive alerts via email
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4"
                        />
                    </div>

                    <div className="bg-primary-dark flex items-center justify-between rounded-lg p-4">
                        <div>
                            <p className="text-text text-sm font-medium">
                                SMS Notifications
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                Receive alerts via text message
                            </p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" />
                    </div>

                    <div className="bg-primary-dark flex items-center justify-between rounded-lg p-4">
                        <div>
                            <p className="text-text text-sm font-medium">
                                In-App Notifications
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                See updates in your dashboard
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                        Manage your account security
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-primary-dark flex items-center justify-between rounded-lg p-4">
                        <div>
                            <p className="text-text text-sm font-medium">
                                Change Password
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                Update your password regularly
                            </p>
                        </div>
                        <Button variant="secondary" className="text-xs">
                            Change
                        </Button>
                    </div>

                    <div className="bg-primary-dark flex items-center justify-between rounded-lg p-4">
                        <div>
                            <p className="text-text text-sm font-medium">
                                Two-Factor Authentication
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                Add an extra layer of security
                            </p>
                        </div>
                        <Button variant="secondary" className="text-xs">
                            Enable
                        </Button>
                    </div>

                    <div className="bg-error/10 border-error/20 flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="text-error text-sm font-medium">
                                Delete Account
                            </p>
                            <p className="text-error/70 mt-1 text-xs">
                                Permanently delete your account and data
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            className="text-error hover:text-error text-xs"
                        >
                            Delete
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
