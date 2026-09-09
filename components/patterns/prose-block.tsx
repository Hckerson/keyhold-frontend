import { proseHeadingId } from "@/lib/config/prose";
import type { ProseBlock as ProseBlockData } from "@/lib/types";

export interface ProseBlockProps {
    block: ProseBlockData;
}

export function ProseBlock({ block }: ProseBlockProps) {
    return (
        <section
            id={block.id}
            aria-labelledby={proseHeadingId(block.id)}
            className="scroll-mt-24"
        >
            <h2
                id={proseHeadingId(block.id)}
                className="text-h6 font-display text-text font-light"
            >
                {block.heading}
            </h2>

            <div className="mt-3 flex flex-col gap-3">
                {block.paragraphs.map((paragraph) => (
                    <p
                        key={paragraph}
                        className="text-text-secondary max-w-[68ch] text-sm leading-relaxed"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>

            {block.bullets && (
                <ul className="border-border-light mt-3 flex max-w-[68ch] flex-col gap-2 border-l pl-4">
                    {block.bullets.map((bullet) => (
                        <li
                            key={bullet}
                            className="text-text-secondary text-sm leading-relaxed"
                        >
                            {bullet}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

ProseBlock.displayName = "ProseBlock";
