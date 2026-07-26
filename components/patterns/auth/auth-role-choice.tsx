import type { UserRole } from "@/lib/types/auth";
import { cn } from "@/lib/utils";

export type SignupRole = Extract<UserRole, "BUYER" | "SELLER">;

const ROLE_OPTIONS: {
    value: SignupRole;
    label: string;
    description: string;
}[] = [
    {
        value: "BUYER",
        label: "Buying",
        description: "Seeking a residence",
    },
    {
        value: "SELLER",
        label: "Listing",
        description: "Presenting a property",
    },
];

export interface AuthRoleChoiceProps {
    name: string;
    legend: string;
    value: SignupRole | null;
    error?: string;
    onChange: (role: SignupRole) => void;
}

export function AuthRoleChoice({
    name,
    legend,
    value,
    error,
    onChange,
}: AuthRoleChoiceProps) {
    const errorId = error ? `${name}-error` : undefined;

    return (
        <fieldset
            className="flex flex-col gap-1.5"
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
        >
            <legend className="text-text text-xs font-medium">{legend}</legend>
            <div className="grid grid-cols-2 gap-2">
                {ROLE_OPTIONS.map((option) => {
                    const selected = value === option.value;

                    return (
                        <label
                            key={option.value}
                            className={cn(
                                "ease-smooth flex cursor-pointer flex-col gap-0.5 rounded-lg border p-3 transition-colors duration-200",
                                "has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-2",
                                selected
                                    ? "border-accent bg-accent-light"
                                    : "border-border bg-background-alt hover:border-border-dark",
                            )}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={selected}
                                onChange={() => onChange(option.value)}
                                className="sr-only"
                            />
                            <span
                                className={cn(
                                    "text-xs font-semibold",
                                    selected ? "text-accent" : "text-text",
                                )}
                            >
                                {option.label}
                            </span>
                            <span className="text-text-secondary text-xs">
                                {option.description}
                            </span>
                        </label>
                    );
                })}
            </div>
            {error && (
                <p id={errorId} className="text-error text-xs">
                    {error}
                </p>
            )}
        </fieldset>
    );
}

AuthRoleChoice.displayName = "AuthRoleChoice";
