import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { GuaranteeCard } from "@/components/sections/home/guarantee-card";
import {
    GUARANTEES_COPY,
    PLATFORM_GUARANTEES,
    PLATFORM_SAFEGUARDS,
} from "@/lib/data/platform-guarantees";

export function GuaranteesSection() {
    return (
        <section className="section-pady bg-background">
            <SectionShell>
                <div className="mb-8">
                    <SectionHeading
                        eyebrow={GUARANTEES_COPY.eyebrow}
                        title={GUARANTEES_COPY.title}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {PLATFORM_GUARANTEES.map((guarantee) => (
                        <GuaranteeCard
                            key={guarantee.id}
                            guarantee={guarantee}
                        />
                    ))}
                </div>

                <ul className="border-border trio-grid mt-8 gap-4 border-t pt-6">
                    {PLATFORM_SAFEGUARDS.map((badge) => (
                        <li
                            key={badge.label}
                            className="flex items-start gap-2.5"
                        >
                            <span className="border-border text-accent grid size-7 shrink-0 place-items-center rounded-full border">
                                <badge.icon size={14} strokeWidth={1.5} />
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-text text-xs font-semibold">
                                    {badge.label}
                                </span>
                                <span className="text-text-muted text-xs leading-relaxed">
                                    {badge.detail}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </SectionShell>
        </section>
    );
}

GuaranteesSection.displayName = "GuaranteesSection";
