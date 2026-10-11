import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
import {
    STARTING_PASSWORD_LENGTH,
    USER_INVITE_COPY as COPY,
} from "@/lib/config/user-invite";
import { generatePassword } from "@/lib/utils/password";

export interface UserPasswordFieldProps {
    value: string;
    error?: string;
    onChange: (password: string) => void;
}

export function UserPasswordField({
    value,
    error,
    onChange,
}: UserPasswordFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <FormField
                name="password"
                variant="code"
                label={COPY.password}
                autoComplete="new-password"
                spellCheck={false}
                value={value}
                error={error}
                onChange={(event) => onChange(event.target.value)}
                endSlot={
                    <Button
                        type="button"
                        emphasis="quiet"
                        icon={Sparkles}
                        onClick={() =>
                            onChange(generatePassword(STARTING_PASSWORD_LENGTH))
                        }
                        className="-mr-1 h-6 px-2"
                    >
                        {COPY.generate}
                    </Button>
                }
            />
            <p className="text-text-muted text-xs">{COPY.passwordHint}</p>
        </div>
    );
}

UserPasswordField.displayName = "UserPasswordField";
