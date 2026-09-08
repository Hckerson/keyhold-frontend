import { PROVIDER_MARKS } from "@/components/features/auth/parts/provider-marks";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { AUTH_PROVIDERS, oauthStartUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const providerColumns = (count: number) =>
    count >= 3 ? "grid-cols-3" : "grid-cols-2";

const PROVIDER_LABELS: Record<string, string> = {
    google: "Google",
    apple: "Apple",
    facebook: "Facebook",
};

export interface SocialAuthRowProps {
    action?: string;
    label?: string;
    redirectTo?: string;
    disabled?: boolean;
}

export function SocialAuthRow({
    action = "Continue",
    label = "Or continue with",
    redirectTo,
    disabled = false,
}: SocialAuthRowProps) {
    const providers = AUTH_PROVIDERS.filter(
        (provider) => provider in PROVIDER_MARKS,
    );

    if (providers.length === 0) return null;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span aria-hidden="true" className="bg-border h-px flex-1" />
                <span
                    className={cn(
                        authLabelVariants({ tier: "label" }),
                        "text-text-muted select-none",
                    )}
                >
                    {label}
                </span>
                <span aria-hidden="true" className="bg-border h-px flex-1" />
            </div>
            <div
                className={cn("grid gap-2", providerColumns(providers.length))}
            >
                {providers.map((provider) => {
                    const Mark = PROVIDER_MARKS[provider];
                    const name = PROVIDER_LABELS[provider] ?? provider;

                    return (
                        <a
                            key={provider}
                            href={oauthStartUrl(provider, redirectTo)}
                            aria-label={`${action} with ${name}`}
                            aria-disabled={disabled || undefined}
                            tabIndex={disabled ? -1 : undefined}
                            className={cn(
                                authLabelVariants({ tier: "label" }),
                                "border-border bg-background text-text-secondary hover:border-highlight hover:text-text focus-visible:ring-accent ease-smooth flex h-9 items-center justify-center gap-2 rounded-xs border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                                disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            <Mark className="size-3.5 shrink-0" />
                            {name}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

SocialAuthRow.displayName = "SocialAuthRow";
