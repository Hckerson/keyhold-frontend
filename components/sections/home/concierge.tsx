import {
    FileText,
    Search,
    CalendarDays,
    KeyRound,
    type LucideIcon,
} from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";

interface ProcessStep {
    idx: string;
    icon: LucideIcon;
    title: string;
    description: string;
}

const STEPS: ProcessStep[] = [
    {
        idx: "01",
        icon: FileText,
        title: "A private brief",
        description:
            "We begin with a conversation — your life, your patterns, and what home should feel like.",
    },
    {
        idx: "02",
        icon: Search,
        title: "A curated shortlist",
        description:
            "A tailored selection, including off-market properties you won't find elsewhere.",
    },
    {
        idx: "03",
        icon: CalendarDays,
        title: "Private viewings",
        description:
            "Discreet, unhurried tours arranged around your schedule and privacy.",
    },
    {
        idx: "04",
        icon: KeyRound,
        title: "To the keys",
        description:
            "Negotiation, closing, and handover — managed end to end, seamlessly.",
    },
];

function StepRow({ step }: { step: ProcessStep }) {
    return (
        <li className="border-border grid grid-cols-[auto_auto_1fr] items-start gap-4 border-b py-4">
            <span className="text-highlight pt-0.5 font-mono text-[10px] tracking-[0.12em] tabular-nums">
                {step.idx}
            </span>
            <span className="border-border text-accent grid size-6 shrink-0 place-items-center rounded-full border">
                <step.icon size={12} strokeWidth={1.5} />
            </span>
            <div className="flex flex-col gap-1">
                <h3 className="text-text text-xs font-semibold">
                    {step.title}
                </h3>
                <p className="text-text-secondary line-clamp-2 max-w-[62ch] text-xs leading-[1.8]">
                    {step.description}
                </p>
            </div>
        </li>
    );
}

export function ConciergeSection() {
    return (
        <section className="bg-background-muted py-16 md:py-20">
            <SectionShell>
                <div className="grid gap-10 lg:grid-cols-[38%_1fr] lg:gap-16">
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

                    <ol className="border-border border-t">
                        {STEPS.map((step) => (
                            <StepRow key={step.idx} step={step} />
                        ))}
                    </ol>
                </div>
            </SectionShell>
        </section>
    );
}
