import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionEyebrow } from "@/components/patterns/section-heading";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
    return (
        <section className="bg-background-muted border-border relative isolate overflow-hidden border-y py-16 md:py-20">
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
                        <Link href="/signup">
                            <Button variant="primary" size="md">
                                Sign Up
                                <ArrowUpRight
                                    size={15}
                                    strokeWidth={1.5}
                                    className="ml-1.5"
                                />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="secondary" size="md">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </SectionShell>
        </section>
    );
}

CtaBanner.displayName = "CtaBanner";
