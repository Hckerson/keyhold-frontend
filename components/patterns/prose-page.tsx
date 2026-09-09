import type { ReactNode } from "react";
import { SectionShell } from "@/components/patterns/section-shell";
import { ProseBlock } from "@/components/patterns/prose-block";
import { ProseContents } from "@/components/patterns/prose-contents";
import { PROSE_COPY, PROSE_CONTENTS_MIN_BLOCKS } from "@/lib/config/prose";
import type { ProsePage as ProsePageData } from "@/lib/types";

export interface ProsePageProps {
    page: ProsePageData;
    children?: ReactNode;
}

export function ProsePage({ page, children }: ProsePageProps) {
    const showContents = page.blocks.length >= PROSE_CONTENTS_MIN_BLOCKS;

    return (
        <SectionShell className="section-pady">
            <header className="max-w-[60ch]">
                <p className="micro-label">{page.eyebrow}</p>
                <h1 className="text-h3 font-display text-text mt-3 font-light">
                    {page.title}
                </h1>
                <p className="text-text-secondary mt-4 text-lg leading-relaxed">
                    {page.lede}
                </p>
                {page.updated && (
                    <p className="micro-label mt-4">
                        {PROSE_COPY.updated} · {page.updated}
                    </p>
                )}
            </header>

            {children}

            <div className="prose-split mt-10">
                {showContents && <ProseContents blocks={page.blocks} />}

                <div className="flex min-w-0 flex-1 flex-col gap-8">
                    {page.blocks.map((block) => (
                        <ProseBlock key={block.id} block={block} />
                    ))}
                </div>
            </div>
        </SectionShell>
    );
}

ProsePage.displayName = "ProsePage";
