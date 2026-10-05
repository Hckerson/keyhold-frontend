import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JournalLatestList } from "@/components/sections/site/journal-latest-list";
import { JOURNAL_COPY as COPY, type JournalLatest } from "@/lib/data/journal";
import { cn } from "@/lib/utils";

export function JournalEmpty({ latest }: { latest: JournalLatest }) {
    const hasLatest = latest.listings.length > 0;

    return (
        <div
            className={cn(
                "border-border mt-10 overflow-hidden rounded-xl border shadow-sm",
                hasLatest ? "journal-split max-w-5xl" : "max-w-[68ch]",
            )}
        >
            <div className="bg-background-muted flex flex-col items-start gap-3 p-5">
                <p className="micro-label">{COPY.emptyEyebrow}</p>
                <h2 className="text-h5 font-display text-text leading-tight font-light">
                    {COPY.emptyTitle}
                </h2>
                <p className="text-text-secondary max-w-[40ch] text-xs leading-relaxed">
                    {COPY.emptyLede}
                </p>
                <Button
                    asChild
                    emphasis="solid"
                    tone="accent"
                    className="mt-auto"
                >
                    <Link href={COPY.emptyHref}>
                        {COPY.emptyAction}
                        <ArrowUpRight
                            className="size-3"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </Link>
                </Button>
            </div>

            {hasLatest && <JournalLatestList latest={latest} />}
        </div>
    );
}

JournalEmpty.displayName = "JournalEmpty";
