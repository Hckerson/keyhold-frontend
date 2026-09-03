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
                            eyebrow="The concierge · 4 steps"
                            title={
                                <>
                                    Considered from first call to{" "}
                                    <span className="text-accent italic">
                                        keys.
                                    </span>
                                </>
                            }
                        />
                        <p className="text-text-secondary max-w-[44ch] text-xs leading-[1.9]">
                            A single point of contact, discretion at every step,
                            and a process shaped entirely around you. No
                            listings feed, no noise — only the work of finding
                            the right home.
                        </p>
                    </div>
                </ConciergeProcess>
            </SectionShell>
        </section>
    );
}
