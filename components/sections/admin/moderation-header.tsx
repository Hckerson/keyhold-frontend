import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Link
                    href="/admin/verifications"
                    className={buttonVariants({
                        variant: "primary",
                        size: "sm",
                    })}
                >
                    {QUEUE_ACTION}
                </Link>
            </div>
        </header>
    );
}

ModerationHeader.displayName = "ModerationHeader";
