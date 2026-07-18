import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    prefix?: ReactNode;
    className?: string;
}

export function FormField({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    prefix,
    className,
}: FormFieldProps) {
    return (
        <div className={cn("space-y-1.5", className)}>
            <label htmlFor={name} className="text-text text-sm font-medium">
                {label}
            </label>
            <div className="relative">
                {prefix && (
                    <span className="text-text-secondary absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                        {prefix}
                    </span>
                )}
                <Input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={prefix ? "pl-7" : undefined}
                />
            </div>
        </div>
    );
}

FormField.displayName = "FormField";
