import Link from "next/link";
import { PageIntro } from "@/components/patterns/page-intro";
import { SectionShell } from "@/components/patterns/section-shell";
import { JournalEmpty } from "@/components/sections/site/journal-empty";
import {
    JOURNAL_COPY as COPY,
    JOURNAL_ENTRIES,
    type JournalLatest,
} from "@/lib/data/journal";

export function JournalIndex({ latest }: { latest: JournalLatest }) {
    return (
        <SectionShell className="section-pady">
            <PageIntro
                eyebrow={COPY.eyebrow}
                title={COPY.title}
                lede={COPY.lede}
            />

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
                                <p className="text-text-secondary mt-2 text-xs leading-relaxed">
                                    {entry.lede}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <JournalEmpty latest={latest} />
            )}
        </SectionShell>
    );
}

JournalIndex.displayName = "JournalIndex";
