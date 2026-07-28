"use client";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { ToggleRow } from "@/components/ui/forms/toggle-row";
import {
    CONTACT_METHODS,
    type ContactMethod,
} from "@/lib/data/dashboard-settings";

export interface ContactPreferencesPanelProps {
    contactMethod: ContactMethod;
    visibleToAgents: boolean;
    analyticsOptIn: boolean;
    onContactMethodChange: (method: ContactMethod) => void;
    onVisibleToAgentsChange: (visible: boolean) => void;
    onAnalyticsOptInChange: (optIn: boolean) => void;
}

export function ContactPreferencesPanel({
    contactMethod,
    visibleToAgents,
    analyticsOptIn,
    onContactMethodChange,
    onVisibleToAgentsChange,
    onAnalyticsOptInChange,
}: ContactPreferencesPanelProps) {
    return (
        <Panel
            title="Preferences"
            description="How we contact you and what we share"
        >
            <div className="space-y-2">
                <div className="bg-background border-border-light rounded-lg border p-3">
                    <p className="micro-label">Preferred contact method</p>
                    <div
                        role="group"
                        aria-label="Preferred contact method"
                        className="mt-2 flex flex-wrap gap-2"
                    >
                        {CONTACT_METHODS.map((method) => (
                            <Button
                                key={method.value}
                                variant={
                                    contactMethod === method.value
                                        ? "primary"
                                        : "ghost"
                                }
                                size="sm"
                                type="button"
                                aria-pressed={contactMethod === method.value}
                                onClick={() =>
                                    onContactMethodChange(method.value)
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
                    onCheckedChange={onVisibleToAgentsChange}
                />
                <ToggleRow
                    title="Usage analytics"
                    description="Share anonymised browsing data to improve recommendations"
                    checked={analyticsOptIn}
                    onCheckedChange={onAnalyticsOptInChange}
                />
            </div>
        </Panel>
    );
}
