import { buttonVariants } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { PROVIDER_MARKS } from "@/components/features/auth/parts/provider-marks";
import { AUTH_PROVIDERS, oauthStartUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PROVIDER_LABELS: Record<string, string> = {
    google: "Google",
    apple: "Apple",
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
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <Divider className="flex-1" />
                <span className="text-text-muted font-mono text-[10px] tracking-wide uppercase select-none">
                    {label}
                </span>
                <Divider className="flex-1" />
            </div>
            <div className="bg-background-muted border-border-light grid grid-cols-1 gap-2 rounded-lg border p-2">
                {providers.map((provider) => {
                    const Mark = PROVIDER_MARKS[provider];
                    const name = PROVIDER_LABELS[provider] ?? provider;

                    return (
                        <a
                            key={provider}
                            href={oauthStartUrl(provider, redirectTo)}
                            aria-disabled={disabled || undefined}
                            tabIndex={disabled ? -1 : undefined}
                            className={cn(
                                buttonVariants({
                                    variant: "secondary",
                                    size: "sm",
                                }),
                                "w-full gap-2",
                                disabled && "pointer-events-none opacity-50",
                            )}
                        >
                            <Mark className="size-4 shrink-0" />
                            {`${action} with ${name}`}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

SocialAuthRow.displayName = "SocialAuthRow";
