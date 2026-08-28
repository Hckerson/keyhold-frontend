"use client";

import { Switch } from "@/components/ui/forms/switch";
import {
    PRIVACY_SCOPES,
    PRIVACY_SHARED_LABEL,
    PRIVACY_WITHHELD_LABEL,
} from "@/lib/config/account-tones";
import { chartToneSoft, chartToneText } from "@/lib/config/chart-tones";
import type { PrivacyControl } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface PrivacyControlRowProps<K extends string> {
    control: PrivacyControl<K>;
    shared: boolean;
    onToggle: (id: K) => void;
}

export function PrivacyControlRow<K extends string>({
    control,
    shared,
    onToggle,
}: PrivacyControlRowProps<K>) {
    const scope = PRIVACY_SCOPES[control.scope];
    const Icon = control.icon;

    return (
        <li className="flex h-11 items-center gap-2">
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[scope.tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {control.label}
            </span>
            <span className="wide-only text-text-secondary w-32 shrink-0 truncate text-xs">
                {control.audience}
            </span>
            <span
                className={cn(
                    "w-12 shrink-0 text-right text-xs font-medium",
                    shared ? chartToneText[scope.tone] : "text-text-muted",
                )}
            >
                {shared ? PRIVACY_SHARED_LABEL : PRIVACY_WITHHELD_LABEL}
            </span>
            <Switch
                checked={shared}
                onChange={() => onToggle(control.id)}
                aria-label={control.label}
                className="ml-1 shrink-0"
            />
        </li>
    );
}

PrivacyControlRow.displayName = "PrivacyControlRow";
