import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { BrowseColumn } from "@/components/sections/home/browse-column";
import { HOME_COPY } from "@/lib/data/home";
import type { BrowseGroup } from "@/lib/types";

export function BrowseIndex({ groups }: { groups: BrowseGroup[] }) {
    return (
        <section className="section-pady bg-background-alt border-border border-y">
            <SectionShell>
                <div className="mb-8">
                    <SectionHeading
                        eyebrow={HOME_COPY.browse.eyebrow}
                        title={HOME_COPY.browse.title}
                    />
                </div>

                <div className="index-grid">
                    {groups.map((group) => (
                        <BrowseColumn key={group.title} group={group} />
                    ))}
                </div>
            </SectionShell>
        </section>
    );
}

BrowseIndex.displayName = "BrowseIndex";
