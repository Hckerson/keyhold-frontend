import {
    FileText,
    Search,
    CalendarDays,
    KeyRound,
    type LucideIcon,
} from "lucide-react";
import { SectionShell } from "@/components/sections/section-shell";

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

export function ConciergeSection() {
    return (
        <section className="bg-background-muted py-20 md:py-24">
            <SectionShell>
                <div className="grid gap-12 lg:grid-cols-[40%_1fr] lg:gap-18">
                    <div>
                        <p className="text-highlight-dark text-caption font-mono tracking-[0.14em] uppercase">
                            The Concierge
                        </p>
                        <h2 className="font-display text-text text-h3 mt-4 mb-6 font-light">
                            Considered from first call to{" "}
                            <span className="text-accent italic">keys.</span>
                        </h2>
                        <p className="text-text-secondary max-w-[42ch] text-base">
                            A single point of contact, discretion at every step,
                            and a process shaped entirely around you. No
                            listings feed, no noise — only the work of finding
                            the right home.
                        </p>
                    </div>

                    <ol className="border-border-light border-t">
                        {STEPS.map((step) => (
                            <li
                                key={step.idx}
                                className="border-border-light grid grid-cols-[auto_auto_1fr] items-start gap-5 border-b py-6"
                            >
                                <span className="text-highlight pt-1 font-mono text-sm font-medium tabular-nums">
                                    {step.idx}
                                </span>
                                <step.icon
                                    size={18}
                                    strokeWidth={1.5}
                                    className="text-accent mt-0.5 shrink-0"
                                />
                                <div>
                                    <h3 className="font-display text-text text-h6 mb-1 font-normal">
                                        {step.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </SectionShell>
        </section>
    );
}
