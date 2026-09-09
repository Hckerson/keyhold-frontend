import Link from "next/link";
import { Newspaper } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionShell } from "@/components/patterns/section-shell";
import { buttonVariants } from "@/components/ui/button";
import { JOURNAL_COPY as COPY, JOURNAL_ENTRIES } from "@/lib/data/journal";

export function JournalIndex() {
    return (
        <SectionShell className="section-pady">
            <header className="max-w-[60ch]">
                <p className="micro-label">{COPY.eyebrow}</p>
                <h1 className="text-h3 font-display text-text mt-3 font-light">
                    {COPY.title}
                </h1>
                <p className="text-text-secondary mt-4 text-lg leading-relaxed">
                    {COPY.lede}
                </p>
            </header>

            {JOURNAL_ENTRIES.length > 0 ? (
                <ul className="mt-10 flex max-w-[68ch] flex-col">
                    {JOURNAL_ENTRIES.map((entry) => (
                        <li
                            key={entry.id}
                            className="border-border-light border-b py-6 first:pt-0"
                        >
                            <Link href={entry.href} className="group block">
                                <p className="micro-label">
                                    {entry.publishedAt} · {entry.author}
                                </p>
                                <h2 className="text-h6 font-display text-text group-hover:text-accent ease-smooth mt-2 font-light transition-colors duration-200">
                                    {entry.title}
                                </h2>
                                <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                                    {entry.lede}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="mt-10 flex max-w-[68ch] flex-col items-start gap-4">
                    <EmptyState
                        icon={Newspaper}
                        title={COPY.emptyTitle}
                        description={COPY.emptyLede}
                    />
                    <Link
                        href={COPY.emptyHref}
                        className={buttonVariants({ size: "sm" })}
                    >
                        {COPY.emptyAction}
                    </Link>
                </div>
            )}
        </SectionShell>
    );
}

JournalIndex.displayName = "JournalIndex";
