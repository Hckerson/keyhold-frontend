"use client";

import { Callout } from "@/components/ui/callout";
import { AgentSettingsHeader } from "@/components/sections/agent/agent-settings-header";
import { AgentSettingsMain } from "@/components/sections/agent/agent-settings-main";
import { AgentSettingsRail } from "@/components/sections/agent/agent-settings-rail";
import { AgentSettingsStatBand } from "@/components/sections/agent/agent-settings-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { PasswordModal } from "@/components/features/settings/password-modal";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useAgentSettings } from "@/lib/hooks/use-agent-settings";

const SAVED_TITLE = "Profile saved";
const SAVED_LEDE =
    "Buyers see the updated details on every listing you represent.";

export function AgentSettingsConsole() {
    const settings = useAgentSettings();

    if (settings.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.settings}
                onRetry={settings.retry}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AgentSettingsHeader
                dirty={settings.dirty}
                saved={settings.saved}
                saving={settings.saving}
                updatedAt={settings.user?.updatedAt}
                onReset={settings.reset}
            />

            <AgentSettingsStatBand
                stats={settings.stats}
                pending={settings.loading}
            />

            {settings.saved && (
                <Callout
                    variant="success"
                    title={SAVED_TITLE}
                    description={SAVED_LEDE}
                />
            )}

            <div className="console-split gap-3">
                <AgentSettingsMain
                    form={settings.form}
                    notifications={settings.notifications}
                    pending={settings.pending}
                    strength={settings.strength}
                    verified={settings.verified}
                    credentials={settings.credentials.length}
                    updatedAt={settings.user?.updatedAt}
                    onFieldChange={settings.changeField}
                    onNotificationToggle={settings.toggleNotification}
                    onSubmit={settings.submit}
                />
                <AgentSettingsRail
                    signals={settings.signals}
                    strength={settings.strength}
                    credentials={settings.credentials}
                    onSecurityAction={settings.openPasswordReset}
                />
            </div>

            <PasswordModal
                open={settings.resetOpen}
                email={settings.user?.email ?? ""}
                pending={settings.resettingPassword}
                sent={settings.resetSent}
                onClose={settings.closePasswordReset}
                onSend={settings.sendPasswordReset}
            />
        </div>
    );
}

AgentSettingsConsole.displayName = "AgentSettingsConsole";
