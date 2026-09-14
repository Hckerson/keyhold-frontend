"use client";

import { Button } from "@/components/ui/button";
import {
    CONTACT_METHODS,
    type ContactMethod,
} from "@/lib/data/dashboard-settings";

const GROUP_LABEL = "Preferred contact method";

export interface ContactMethodPickerProps {
    value: ContactMethod;
    onChange: (method: ContactMethod) => void;
}

export function ContactMethodPicker({
    value,
    onChange,
}: ContactMethodPickerProps) {
    return (
        <div className="py-3">
            <p className="micro-label">{GROUP_LABEL}</p>
            <div
                role="group"
                aria-label={GROUP_LABEL}
                className="mt-2 flex flex-wrap gap-2"
            >
                {CONTACT_METHODS.map((method) => {
                    const selected = value === method.value;
                    return (
                        <Button
                            key={method.value}
                            type="button"
                            emphasis={selected ? "solid" : "outline"}
                            tone={selected ? "accent" : "neutral"}
                            aria-pressed={selected}
                            onClick={() => onChange(method.value)}
                        >
                            {method.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

ContactMethodPicker.displayName = "ContactMethodPicker";
