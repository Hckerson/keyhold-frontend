"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormField, type FormFieldProps } from "@/components/ui/form-field";

export interface AuthFieldProps extends Omit<FormFieldProps, "endSlot"> {
    type?: "text" | "email" | "password";
}

export function AuthField({ type = "text", ...props }: AuthFieldProps) {
    const [revealed, setRevealed] = useState(false);
    const isPassword = type === "password";
    const ToggleIcon = revealed ? EyeOff : Eye;

    return (
        <FormField
            {...props}
            type={isPassword && revealed ? "text" : type}
            endSlot={
                isPassword ? (
                    <button
                        type="button"
                        onClick={() => setRevealed((current) => !current)}
                        aria-label={
                            revealed ? "Hide password" : "Show password"
                        }
                        aria-pressed={revealed}
                        className="text-text-muted hover:text-text focus-visible:ring-accent ease-smooth grid size-6 place-items-center rounded-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        <ToggleIcon size={12} strokeWidth={1.5} />
                    </button>
                ) : undefined
            }
        />
    );
}

AuthField.displayName = "AuthField";
