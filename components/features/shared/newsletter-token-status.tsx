"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PageIntro } from "@/components/patterns/page-intro";
import { AUTH_ROUTES } from "@/lib/constants";
import {
    NEWSLETTER_PAGES,
    type NewsletterTokenAction,
} from "@/lib/config/newsletter";
import { useNewsletterToken } from "@/lib/hooks/use-newsletter";

export interface NewsletterTokenStatusProps {
    action: NewsletterTokenAction;
    token?: string;
}

export function NewsletterTokenStatus({
    action,
    token,
}: NewsletterTokenStatusProps) {
    const { state, retry } = useNewsletterToken(action, token);
    const copy = NEWSLETTER_PAGES[action];
    const { title, description } = copy.states[state];

    return (
        <div className="flex flex-col gap-8" aria-live="polite">
            <PageIntro
                eyebrow={copy.eyebrow}
                title={title}
                lede={description}
            />

            <div className="flex flex-wrap items-center gap-3">
                {state === "pending" && <Spinner size="sm" />}
                {state === "failed" && (
                    <Button
                        type="button"
                        emphasis="solid"
                        tone="accent"
                        icon={RotateCcw}
                        onClick={retry}
                    >
                        {copy.retry}
                    </Button>
                )}
                {state !== "pending" && (
                    <Button asChild emphasis="quiet" tone="neutral">
                        <Link href={AUTH_ROUTES.home}>{copy.home}</Link>
                    </Button>
                )}
            </div>
        </div>
    );
}

NewsletterTokenStatus.displayName = "NewsletterTokenStatus";
