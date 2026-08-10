import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MODERATION_TITLE = "Listing Moderation";
const MODERATION_LEDE =
    "What is waiting on a decision, what the compliance scan caught, and who keeps sending it";
const QUEUE_ACTION = "Verifications";

export interface ModerationHeaderProps {
    summary: string;
}

export function ModerationHeader({ summary }: ModerationHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {MODERATION_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {MODERATION_LEDE}
                </p>
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:flex-none sm:justify-end">
                <p className="micro-label min-w-0 truncate">{summary}</p>
                <Link
                    href="/admin/verifications"
                    className={cn(
                        buttonVariants({ variant: "primary", size: "sm" }),
                        "shrink-0",
                    )}
                >
                    {QUEUE_ACTION}
                </Link>
            </div>
        </header>
    );
}

ModerationHeader.displayName = "ModerationHeader";
