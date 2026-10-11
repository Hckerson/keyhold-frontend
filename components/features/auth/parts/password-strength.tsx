import { ToneReading } from "@/components/patterns/tone-reading";
import { strengthTone } from "@/lib/config/account-tones";
import {
    passwordStrength,
    passwordStrengthLabel,
    unmetPasswordRule,
} from "@/lib/data/signup";

const STRENGTH_LABEL = "Password strength";

export interface PasswordStrengthProps {
    password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    if (password === "") return null;

    const score = passwordStrength(password);
    const tone = strengthTone(score);

    return (
        <span className="flex items-center">
            <ToneReading
                value={passwordStrengthLabel(score)}
                tone={tone}
                label={`${STRENGTH_LABEL}: ${passwordStrengthLabel(score)}`}
            />
            <span className="sr-only">{unmetPasswordRule(password) ?? ""}</span>
        </span>
    );
}

PasswordStrength.displayName = "PasswordStrength";
