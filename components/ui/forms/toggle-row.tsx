"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/forms/switch";
import { cn } from "@/lib/utils";

export interface ToggleRowProps {
    title: string;
    description?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    className?: string;
}

export function ToggleRow({
    title,
    description,
    defaultChecked = false,
    checked,
    onCheckedChange,
    className,
}: ToggleRowProps) {
    const [internal, setInternal] = useState(defaultChecked);
    const isOn = checked ?? internal;

    const toggle = () => {
        const next = !isOn;
        onCheckedChange?.(next);
        if (checked === undefined) setInternal(next);
    };

    return (
        <label
            className={cn(
                "bg-background border-border-light hover:bg-background-alt ease-smooth flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-3 transition-colors",
                className,
            )}
        >
            <div className="min-w-0">
                <p className="text-text text-xs font-semibold">{title}</p>
                {description && (
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {description}
                    </p>
                )}
            </div>
            <Switch checked={isOn} onChange={toggle} className="shrink-0" />
        </label>
    );
}

ToggleRow.displayName = "ToggleRow";
