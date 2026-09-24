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

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                    {groups.map((group) => (
                        <BrowseColumn key={group.title} group={group} />
                    ))}
                </div>
            </SectionShell>
        </section>
    );
}

BrowseIndex.displayName = "BrowseIndex";
