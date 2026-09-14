import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionEyebrow } from "@/components/patterns/section-heading";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
    return (
        <section className="section-pady bg-background-muted border-border relative isolate overflow-hidden border-y">
            <div
                aria-hidden="true"
                className="bg-highlight/15 pointer-events-none absolute -top-24 left-1/4 -z-10 h-72 w-96 rounded-full blur-[90px]"
            />

            <SectionShell>
                <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-5 text-center">
                    <SectionEyebrow>Join 10,000+ buyers</SectionEyebrow>
                    <h2 className="font-display text-text text-h3 leading-[1.08] font-light tracking-tight">
                        Ready to get{" "}
                        <span className="text-accent italic">started?</span>
                    </h2>
                    <p className="text-text-secondary text-xs leading-[1.9]">
                        Create an account to save listings, track offers and be
                        told first when something off-market comes up in a
                        neighbourhood you follow.
                    </p>

                    <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                        <Button
                            asChild
                            emphasis="solid"
                            tone="accent"
                            size="lg"
                        >
                            <Link href="/signup">
                                Sign Up
                                <ArrowUpRight
                                    className="size-4"
                                    strokeWidth={1.5}
                                />
                            </Link>
                        </Button>
                        <Button asChild size="lg">
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </SectionShell>
        </section>
    );
}

CtaBanner.displayName = "CtaBanner";
