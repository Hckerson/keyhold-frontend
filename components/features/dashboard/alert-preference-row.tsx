"use client";

import { Checkbox } from "@/components/ui/forms/checkbox";
import { Switch } from "@/components/ui/forms/switch";
import { FormField } from "@/components/ui/forms/form-field";
import {
    channels,
    type AlertPreference,
    type AlertPreferenceCopy,
    type ChannelKey,
} from "@/lib/data/alerts";

export interface AlertPreferenceRowProps {
    item: AlertPreferenceCopy;
    preference: AlertPreference;
    threshold: string;
    onThresholdChange: (value: string) => void;
    onToggleEnabled: () => void;
    onToggleChannel: (channel: ChannelKey) => void;
}

export function AlertPreferenceRow({
    item,
    preference,
    threshold,
    onThresholdChange,
    onToggleEnabled,
    onToggleChannel,
}: AlertPreferenceRowProps) {
    return (
        <div className="bg-background border-border-light rounded-lg border p-3">
            <label className="flex cursor-pointer items-start justify-between gap-4">
                <span className="min-w-0">
                    <span className="text-text block text-xs font-medium">
                        {item.title}
                    </span>
                    <span className="text-text-secondary mt-0.5 block text-xs">
                        {item.description}
                    </span>
                </span>
                <Switch
                    checked={preference.enabled}
                    onChange={onToggleEnabled}
                    aria-label={`Enable ${item.title} alerts`}
                    className="shrink-0"
                />
            </label>

            {preference.enabled && (
                <div className="border-border-light mt-3 space-y-3 border-t pt-3">
                    {item.key === "price-drops" && (
                        <FormField
                            label="Drop threshold"
                            name="priceDropThreshold"
                            value={threshold}
                            onChange={(event) =>
                                onThresholdChange(event.target.value)
                            }
                            prefix="$"
                            variant="numeric"
                            inputMode="numeric"
                            placeholder="50,000"
                            className="max-w-56"
                            hint={
                                <span className="text-text-muted text-xs">
                                    Minimum reduction
                                </span>
                            }
                        />
                    )}
                    <div>
                        <p className="micro-label">Channels</p>
                        <div className="mt-1.5 flex flex-wrap gap-4">
                            {channels.map((channel) => (
                                <Checkbox
                                    key={channel.key}
                                    id={`${item.key}-${channel.key}`}
                                    label={channel.label}
                                    checked={preference.channels[channel.key]}
                                    onChange={() =>
                                        onToggleChannel(channel.key)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

AlertPreferenceRow.displayName = "AlertPreferenceRow";
