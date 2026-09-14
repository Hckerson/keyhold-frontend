import { SectionShell } from "@/components/patterns/section-shell";
import { PageIntro } from "@/components/patterns/page-intro";
import { ProseBlock } from "@/components/patterns/prose-block";
import { ProseContents } from "@/components/patterns/prose-contents";
import { PROSE_COPY, PROSE_CONTENTS_MIN_BLOCKS } from "@/lib/config/prose";
import type { ProsePage as ProsePageData } from "@/lib/types";

export interface ProsePageProps {
    page: ProsePageData;
}

export function ProsePage({ page }: ProsePageProps) {
    const showContents = page.blocks.length >= PROSE_CONTENTS_MIN_BLOCKS;

    return (
        <SectionShell className="section-pady">
            <PageIntro
                eyebrow={page.eyebrow}
                title={page.title}
                lede={page.lede}
                meta={page.updated && `${PROSE_COPY.updated} · ${page.updated}`}
            />

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
