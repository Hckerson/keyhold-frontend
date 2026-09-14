"use client";

import { Panel } from "@/components/ui/panel";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import { LISTING_FORM_SECTIONS } from "@/lib/config/listing-form-sections";
import { cn } from "@/lib/utils";

export interface ListingFormNavProps {
    editing: boolean;
    changed: readonly string[];
}

export function ListingFormNav({ editing, changed }: ListingFormNavProps) {
    const sections = LISTING_FORM_SECTIONS.filter(
        (section) => editing || !section.editOnly,
    );

    return (
        <Panel title={COPY.sections} description={COPY.sectionsLede}>
            <nav aria-label={COPY.sections}>
                <ul className="flex flex-col">
                    {sections.map((section) => {
                        const dirty = section.keys.some((key) =>
                            changed.includes(key),
                        );

                        return (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="border-border-light text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth flex h-9 items-center justify-between gap-2 border-b text-xs transition-colors duration-200 last:border-b-0 focus-visible:ring-2 focus-visible:outline-none"
                                >
                                    <span className="truncate">
                                        {section.label}
                                        {dirty && (
                                            <span className="sr-only">
                                                {COPY.sectionDirty}
                                            </span>
                                        )}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className={cn(
                                            "size-1.5 shrink-0 rounded-full",
                                            dirty
                                                ? "bg-accent"
                                                : "bg-transparent",
                                        )}
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </Panel>
    );
}

ListingFormNav.displayName = "ListingFormNav";
