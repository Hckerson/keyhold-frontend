"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "@/components/ui/input";

export type PasswordFieldProps = Omit<InputProps, "type" | "endSlot">;

export function PasswordField(props: PasswordFieldProps) {
    const [visible, setVisible] = useState(false);

    return (
        <Input
            {...props}
            type={visible ? "text" : "password"}
            endSlot={
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    aria-pressed={visible}
                    aria-label={visible ? "Hide password" : "Show password"}
                    className="text-text-muted hover:text-text ease-smooth transition-colors"
                >
                    {visible ? (
                        <EyeOff size={16} strokeWidth={1.5} />
                    ) : (
                        <Eye size={16} strokeWidth={1.5} />
                    )}
                </button>
            }
        />
    );
}

PasswordField.displayName = "PasswordField";
