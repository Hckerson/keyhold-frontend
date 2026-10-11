import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { ConciergeProcess } from "@/components/sections/home/concierge-process";

export function ConciergeSection() {
    return (
        <section className="section-pady bg-background-muted">
            <SectionShell>
                <ConciergeProcess>
                    <div className="flex flex-col gap-4">
                        <SectionHeading
                            eyebrow="How it works · 4 steps"
                            title={
                                <>
                                    Considered from first search to{" "}
                                    <span className="text-accent italic">
                                        keys.
                                    </span>
                                </>
                            }
                        />
                        <p className="text-text-secondary max-w-[44ch] text-xs leading-[1.9]">
                            One account carries you from a saved search to the
                            closing checklist, with private calls, escrow and a
                            dated milestone for every step.
                        </p>
                    </div>
                </ConciergeProcess>
            </SectionShell>
        </section>
    );
}
