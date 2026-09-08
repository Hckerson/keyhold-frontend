import { ProgressBar } from "@/components/ui/progress-bar";
import { chartToneText } from "@/lib/config/chart-tones";
import { strengthTone } from "@/lib/config/account-tones";
import {
    passwordStrength,
    passwordStrengthLabel,
    unmetPasswordRule,
} from "@/lib/data/signup";
import { cn } from "@/lib/utils";

const METER_LABEL = "Password strength";

export interface PasswordStrengthProps {
    password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    if (password === "") return null;

    const score = passwordStrength(password);
    const tone = strengthTone(score);

    return (
        <span className="flex items-center gap-1.5">
            <ProgressBar
                value={score}
                tone={tone}
                label={METER_LABEL}
                className="w-12"
            />
            <span
                className={cn(
                    "text-[10px] font-medium tracking-wide uppercase",
                    chartToneText[tone],
                )}
            >
                {passwordStrengthLabel(score)}
            </span>
            <span className="sr-only">{unmetPasswordRule(password) ?? ""}</span>
        </span>
    );
}

PasswordStrength.displayName = "PasswordStrength";
