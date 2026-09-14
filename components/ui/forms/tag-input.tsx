"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { Tag } from "@/components/ui/tag";
import { Input } from "@/components/ui/forms/input";
import { FieldShell, errorIdFor } from "@/components/ui/forms/field-shell";

const COMMIT_KEYS = ["Enter", ","];

export interface TagInputProps {
    label: string;
    name: string;
    values: readonly string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    hint?: ReactNode;
    error?: string;
    removeLabel?: (value: string) => string;
}

export function TagInput({
    label,
    name,
    values,
    onChange,
    placeholder,
    hint,
    error,
    removeLabel = (value) => `Remove ${value}`,
}: TagInputProps) {
    const [pending, setPending] = useState("");

    const commit = () => {
        const entry = pending.trim();
        setPending("");
        if (!entry) return;
        const held = values.some(
            (value) => value.toLowerCase() === entry.toLowerCase(),
        );
        if (held) return;
        onChange([...values, entry]);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (COMMIT_KEYS.includes(event.key)) {
            event.preventDefault();
            commit();
            return;
        }
        if (event.key === "Backspace" && !pending && values.length > 0) {
            onChange(values.slice(0, -1));
        }
    };

    return (
        <FieldShell label={label} htmlFor={name} hint={hint} error={error}>
            {values.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                    {values.map((value) => (
                        <li key={value}>
                            <Tag
                                variant="secondary"
                                removable
                                removeLabel={removeLabel(value)}
                                onRemove={() =>
                                    onChange(
                                        values.filter((held) => held !== value),
                                    )
                                }
                            >
                                {value}
                            </Tag>
                        </li>
                    ))}
                </ul>
            )}
            <Input
                id={name}
                name={name}
                value={pending}
                placeholder={placeholder}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorIdFor(name) : undefined}
                onChange={(event) => setPending(event.target.value)}
                onKeyDown={onKeyDown}
                onBlur={commit}
            />
        </FieldShell>
    );
}

TagInput.displayName = "TagInput";
