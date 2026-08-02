"use client";

import { Panel } from "@/components/ui/panel";
import { ToggleRow } from "@/components/ui/forms/toggle-row";
import type { SettingsToggle } from "@/lib/data/dashboard-settings";

export interface TogglePanelProps {
    title: string;
    description: string;
    toggles: readonly SettingsToggle[];
}

export function TogglePanel({ title, description, toggles }: TogglePanelProps) {
    return (
        <Panel title={title} description={description}>
            <div className="space-y-2">
                {toggles.map((item) => (
                    <ToggleRow
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        defaultChecked={item.defaultChecked}
                    />
                ))}
            </div>
        </Panel>
    );
}
