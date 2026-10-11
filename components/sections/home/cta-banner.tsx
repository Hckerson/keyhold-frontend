import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionEyebrow } from "@/components/patterns/section-eyebrow";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
    return (
        <section className="section-pady bg-background-muted border-border relative isolate overflow-hidden border-y">
            <SectionShell>
                <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-5 text-center">
                    <SectionEyebrow>Free to join</SectionEyebrow>
                    <h2 className="font-display text-text text-h3 leading-[1.08] font-light tracking-tight">
                        Ready to get{" "}
                        <span className="text-accent italic">started?</span>
                    </h2>
                    <p className="text-text-secondary text-xs leading-[1.9]">
                        Create an account to save listings and searches, request
                        private viewings and follow every offer to closing.
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
