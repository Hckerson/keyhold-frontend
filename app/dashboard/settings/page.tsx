"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { FormField } from "@/components/ui/form-field";
import { ToggleRow } from "@/components/ui/toggle-row";
import { ActionRow } from "@/components/ui/action-row";
import { Avatar } from "@/components/ui/avatar";
import { Callout } from "@/components/ui/callout";
import { StatusBadge } from "@/components/ui/status-badge";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

type ContactMethod = "email" | "sms" | "phone" | "in-app";
type DialogKey = "password" | "two-factor" | "delete";

const DATA_EXPORT_FILENAME = "account-data.json";
const DELETE_CONFIRMATION = "DELETE";
const MIN_PASSWORD_LENGTH = 8;
const TWO_FACTOR_CODE_LENGTH = 6;
const SAVED_FEEDBACK_MS = 2000;

const contactMethods: { value: ContactMethod; label: string }[] = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "phone", label: "Phone" },
    { value: "in-app", label: "In-app" },
];

const microLabel =
    "text-text-muted font-mono text-[10px] font-medium tracking-wide uppercase";

const emptyPassword = { current: "", next: "", confirm: "" };

const initialProfile = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "(310) 555-0123",
    preferredLocation: "Beverly Hills, CA",
    budgetMin: "2500000",
    budgetMax: "5000000",
};

export default function SettingsPage() {
    const [formData, setFormData] = useState(initialProfile);
    const [saved, setSaved] = useState(false);
    const [photo, setPhoto] = useState<string | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
    const [visibleToAgents, setVisibleToAgents] = useState(true);
    const [analyticsOptIn, setAnalyticsOptIn] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        inApp: true,
    });

    const [dialog, setDialog] = useState<DialogKey | null>(null);
    const [password, setPassword] = useState(emptyPassword);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const [twoFactorError, setTwoFactorError] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState("");
    const [deletionScheduled, setDeletionScheduled] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);

    useEffect(
        () => () => {
            if (photo) URL.revokeObjectURL(photo);
        },
        [photo],
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), SAVED_FEEDBACK_MS);
    };

    const resetForm = () => {
        setFormData(initialProfile);
    };

    const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setPhoto(URL.createObjectURL(file));
    };

    const removePhoto = () => {
        setPhoto(null);
        if (photoInputRef.current) photoInputRef.current.value = "";
    };

    const closeDialog = () => {
        setDialog(null);
        setPassword(emptyPassword);
        setPasswordError(null);
        setTwoFactorCode("");
        setTwoFactorError(null);
        setDeleteConfirm("");
    };

    const submitPassword = () => {
        if (password.next.length < MIN_PASSWORD_LENGTH) {
            setPasswordError(
                `Use at least ${MIN_PASSWORD_LENGTH} characters for your new password.`,
            );
            return;
        }
        if (password.next !== password.confirm) {
            setPasswordError("The new passwords do not match.");
            return;
        }
        setPasswordUpdated(true);
        closeDialog();
        setTimeout(() => setPasswordUpdated(false), SAVED_FEEDBACK_MS);
    };

    const submitTwoFactor = () => {
        if (twoFactorEnabled) {
            setTwoFactorEnabled(false);
            closeDialog();
            return;
        }
        if (
            !/^\d+$/.test(twoFactorCode) ||
            twoFactorCode.length !== TWO_FACTOR_CODE_LENGTH
        ) {
            setTwoFactorError(
                `Enter the ${TWO_FACTOR_CODE_LENGTH}-digit code from your authenticator app.`,
            );
            return;
        }
        setTwoFactorEnabled(true);
        closeDialog();
    };

    const downloadData = () => {
        const payload = {
            profile: formData,
            preferences: {
                contactMethod,
                visibleToAgents,
                analyticsOptIn,
                notifications,
            },
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = DATA_EXPORT_FILENAME;
        link.click();
        URL.revokeObjectURL(url);
    };

    const confirmDelete = () => {
        if (deleteConfirm.trim().toUpperCase() !== DELETE_CONFIRMATION) return;
        setDeletionScheduled(true);
        closeDialog();
    };

    return (
        <div className="max-w-2xl space-y-3">
            <PageHeader
                title="Settings"
                description="Manage your profile and preferences"
            />

            <Panel
                title="Profile"
                description="Update your personal details and photo"
            >
                <div className="border-border-light mb-3 flex flex-wrap items-center gap-3 border-b pb-3">
                    <Avatar
                        size="xl"
                        src={photo ?? undefined}
                        initials="JD"
                        alt="Profile photo"
                    />
                    <div className="space-y-1.5">
                        <p className={microLabel}>Profile Photo</p>
                        <div className="flex flex-wrap gap-2">
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhoto}
                                aria-hidden="true"
                                tabIndex={-1}
                            />
                            <Button
                                variant="secondary"
                                size="sm"
                                type="button"
                                onClick={() => photoInputRef.current?.click()}
                            >
                                <Upload
                                    size={12}
                                    strokeWidth={1.5}
                                    className="mr-1.5"
                                />
                                {photo ? "Replace" : "Upload"}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                type="button"
                                className="text-error hover:text-error"
                                disabled={!photo}
                                onClick={removePhoto}
                            >
                                <Trash2
                                    size={12}
                                    strokeWidth={1.5}
                                    className="mr-1.5"
                                />
                                Remove
                            </Button>
                        </div>
                        <p className="text-text-muted text-xs">
                            JPG or PNG, at least 400 × 400 pixels.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
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
                    <div className="flex gap-2">
                        <Button variant="primary" size="sm" type="submit">
                            {saved ? "Saved!" : "Save Changes"}
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Panel>

            <Panel
                title="Property Preferences"
                description="Set your budget and search criteria"
            >
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
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
                    <div className="flex gap-2">
                        <Button variant="primary" size="sm" type="submit">
                            {saved ? "Saved!" : "Save Preferences"}
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Panel>

            <Panel
                title="Preferences"
                description="How we contact you and what we share"
            >
                <div className="space-y-2">
                    <div className="bg-background border-border-light rounded-lg border p-3">
                        <p className={microLabel}>Preferred contact method</p>
                        <div
                            role="group"
                            aria-label="Preferred contact method"
                            className="mt-2 flex flex-wrap gap-2"
                        >
                            {contactMethods.map((method) => (
                                <Button
                                    key={method.value}
                                    variant={
                                        contactMethod === method.value
                                            ? "primary"
                                            : "ghost"
                                    }
                                    size="sm"
                                    type="button"
                                    aria-pressed={
                                        contactMethod === method.value
                                    }
                                    onClick={() =>
                                        setContactMethod(method.value)
                                    }
                                >
                                    {method.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <ToggleRow
                        title="Show profile to agents"
                        description="Agents can see your name, budget and saved searches"
                        checked={visibleToAgents}
                        onCheckedChange={setVisibleToAgents}
                    />
                    <ToggleRow
                        title="Usage analytics"
                        description="Share anonymised browsing data to improve recommendations"
                        checked={analyticsOptIn}
                        onCheckedChange={setAnalyticsOptIn}
                    />
                </div>
            </Panel>

            <Panel
                title="Notification Settings"
                description="Control how you receive updates"
            >
                <div className="space-y-2">
                    <ToggleRow
                        title="Email Notifications"
                        description="Receive alerts via email"
                        checked={notifications.email}
                        onCheckedChange={(value) =>
                            setNotifications((prev) => ({
                                ...prev,
                                email: value,
                            }))
                        }
                    />
                    <ToggleRow
                        title="SMS Notifications"
                        description="Receive alerts via text message"
                        checked={notifications.sms}
                        onCheckedChange={(value) =>
                            setNotifications((prev) => ({
                                ...prev,
                                sms: value,
                            }))
                        }
                    />
                    <ToggleRow
                        title="In-App Notifications"
                        description="See updates in your dashboard"
                        checked={notifications.inApp}
                        onCheckedChange={(value) =>
                            setNotifications((prev) => ({
                                ...prev,
                                inApp: value,
                            }))
                        }
                    />
                </div>
            </Panel>

            <Panel title="Account" description="Manage your account security">
                <div className="space-y-2">
                    {passwordUpdated && (
                        <Callout
                            variant="success"
                            title="Password updated"
                            description="Use your new password the next time you sign in."
                        />
                    )}
                    {deletionScheduled && (
                        <Callout
                            variant="error"
                            title="Account scheduled for deletion"
                            description="Your data will be removed in 30 days. Restore it any time before then."
                        />
                    )}

                    <ActionRow
                        title="Change Password"
                        description="Update your password regularly"
                        action={
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setDialog("password")}
                            >
                                Change
                            </Button>
                        }
                    />
                    <ActionRow
                        title="Two-Factor Authentication"
                        description="Add an extra layer of security"
                        action={
                            <div className="flex items-center gap-2">
                                <StatusBadge
                                    tone={
                                        twoFactorEnabled ? "success" : "neutral"
                                    }
                                >
                                    {twoFactorEnabled ? "Enabled" : "Off"}
                                </StatusBadge>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setDialog("two-factor")}
                                >
                                    {twoFactorEnabled ? "Disable" : "Enable"}
                                </Button>
                            </div>
                        }
                    />
                    <ActionRow
                        title="Download Data"
                        description="Export your profile, preferences and activity as JSON"
                        action={
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={downloadData}
                            >
                                <Download
                                    size={12}
                                    strokeWidth={1.5}
                                    className="mr-1.5"
                                />
                                Download
                            </Button>
                        }
                    />
                    <ActionRow
                        danger
                        title="Delete Account"
                        description="Permanently delete your account and data"
                        action={
                            deletionScheduled ? (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setDeletionScheduled(false)}
                                >
                                    Restore
                                </Button>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-error hover:text-error"
                                    onClick={() => setDialog("delete")}
                                >
                                    Delete
                                </Button>
                            )
                        }
                    />
                </div>
            </Panel>

            <Modal
                open={dialog === "password"}
                onOpenChange={(open) => {
                    if (!open) closeDialog();
                }}
            >
                <ModalHeader>
                    <ModalTitle>Change Password</ModalTitle>
                </ModalHeader>
                <ModalBody className="space-y-3">
                    <Input
                        id="current-password"
                        label="Current password"
                        type="password"
                        value={password.current}
                        onChange={(event) =>
                            setPassword((prev) => ({
                                ...prev,
                                current: event.target.value,
                            }))
                        }
                    />
                    <Input
                        id="new-password"
                        label="New password"
                        type="password"
                        value={password.next}
                        onChange={(event) =>
                            setPassword((prev) => ({
                                ...prev,
                                next: event.target.value,
                            }))
                        }
                    />
                    <Input
                        id="confirm-password"
                        label="Confirm new password"
                        type="password"
                        value={password.confirm}
                        error={passwordError ?? undefined}
                        onChange={(event) =>
                            setPassword((prev) => ({
                                ...prev,
                                confirm: event.target.value,
                            }))
                        }
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" size="sm" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={submitPassword}
                    >
                        Update Password
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                open={dialog === "two-factor"}
                onOpenChange={(open) => {
                    if (!open) closeDialog();
                }}
            >
                <ModalHeader>
                    <ModalTitle>
                        {twoFactorEnabled
                            ? "Disable Two-Factor"
                            : "Enable Two-Factor"}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody className="space-y-3">
                    {twoFactorEnabled ? (
                        <p className="text-text-secondary text-xs">
                            Turning this off removes the second step when you
                            sign in. You can enable it again at any time.
                        </p>
                    ) : (
                        <>
                            <p className="text-text-secondary text-xs">
                                Enter the {TWO_FACTOR_CODE_LENGTH}-digit code
                                from your authenticator app to finish setup.
                            </p>
                            <Input
                                id="two-factor-code"
                                label="Verification code"
                                inputMode="numeric"
                                maxLength={TWO_FACTOR_CODE_LENGTH}
                                value={twoFactorCode}
                                error={twoFactorError ?? undefined}
                                onChange={(event) =>
                                    setTwoFactorCode(event.target.value)
                                }
                                placeholder="000000"
                            />
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" size="sm" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={submitTwoFactor}
                    >
                        {twoFactorEnabled ? "Disable" : "Enable"}
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                open={dialog === "delete"}
                onOpenChange={(open) => {
                    if (!open) closeDialog();
                }}
            >
                <ModalHeader>
                    <ModalTitle>Delete Account</ModalTitle>
                </ModalHeader>
                <ModalBody className="space-y-3">
                    <Callout
                        variant="error"
                        title="This removes everything"
                        description="Saved listings, offers, viewings and messages are deleted after a 30-day grace period."
                    />
                    <Input
                        id="delete-confirmation"
                        label={`Type ${DELETE_CONFIRMATION} to confirm`}
                        value={deleteConfirm}
                        onChange={(event) =>
                            setDeleteConfirm(event.target.value)
                        }
                        placeholder={DELETE_CONFIRMATION}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" size="sm" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        disabled={
                            deleteConfirm.trim().toUpperCase() !==
                            DELETE_CONFIRMATION
                        }
                        onClick={confirmDelete}
                    >
                        Delete Account
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
