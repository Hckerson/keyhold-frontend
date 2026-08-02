"use client";

import { Download } from "lucide-react";
import { ActionRow } from "@/components/ui/action-row";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";
import type { SettingsDialogKey } from "@/lib/data/dashboard-settings";

export interface AccountPanelProps {
    passwordUpdated: boolean;
    deletionScheduled: boolean;
    twoFactorEnabled: boolean;
    onOpenDialog: (dialog: SettingsDialogKey) => void;
    onDownloadData: () => void;
    onRestoreAccount: () => void;
}

export function AccountPanel({
    passwordUpdated,
    deletionScheduled,
    twoFactorEnabled,
    onOpenDialog,
    onDownloadData,
    onRestoreAccount,
}: AccountPanelProps) {
    return (
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
                            onClick={() => onOpenDialog("password")}
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
                                tone={twoFactorEnabled ? "success" : "neutral"}
                            >
                                {twoFactorEnabled ? "Enabled" : "Off"}
                            </StatusBadge>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onOpenDialog("two-factor")}
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
                            onClick={onDownloadData}
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
                                onClick={onRestoreAccount}
                            >
                                Restore
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-error hover:text-error"
                                onClick={() => onOpenDialog("delete")}
                            >
                                Delete
                            </Button>
                        )
                    }
                />
            </div>
        </Panel>
    );
}
