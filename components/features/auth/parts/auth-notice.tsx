import { cn } from "@/lib/utils";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import type { AuthNoticeTone } from "@/lib/types";

const NOTICE_TONES = {
    error: { rule: "bg-error", title: "text-error" },
    success: { rule: "bg-accent", title: "text-accent" },
    info: { rule: "bg-quiet", title: "text-text-secondary" },
} as const satisfies Record<AuthNoticeTone, { rule: string; title: string }>;

export interface AuthNoticeProps {
    tone: AuthNoticeTone;
    title: string;
    description: string;
}

export function AuthNotice({ tone, title, description }: AuthNoticeProps) {
    const styles = NOTICE_TONES[tone];

    return (
        <div className="border-border bg-background relative overflow-hidden rounded-xs border py-2 pr-3 pl-4">
            <span
                aria-hidden="true"
                className={cn("absolute inset-y-0 left-0 w-0.5", styles.rule)}
            />
            <p
                className={cn(
                    authLabelVariants({ tier: "label" }),
                    styles.title,
                )}
            >
                {title}
            </p>
            <p className="text-text-secondary mt-1 text-xs">{description}</p>
        </div>
    );
}

AuthNotice.displayName = "AuthNotice";
