import Link from "next/link";
import { CalendarCheck, FileSignature, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionEyebrow } from "@/components/sections/section-heading";

export interface ListingEnquiryCardProps {
    responseTime: string;
}

export function ListingEnquiryCard({ responseTime }: ListingEnquiryCardProps) {
    return (
        <section
            aria-label="Arrange a viewing"
            className="border-border-dark bg-background-alt flex flex-col gap-3 rounded-xl border p-4 shadow-md lg:sticky lg:top-56"
        >
            <div className="flex flex-col gap-1.5">
                <SectionEyebrow>Private viewing</SectionEyebrow>
                <p className="text-text-secondary text-xs">
                    Viewings run by appointment through the private office.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Link href="/dashboard/viewings" className="block">
                    <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        icon={
                            <CalendarCheck
                                className="size-3"
                                strokeWidth={1.5}
                            />
                        }
                    >
                        Schedule a viewing
                    </Button>
                </Link>
                <Link href="/dashboard/offers" className="block">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        icon={
                            <FileSignature
                                className="size-3"
                                strokeWidth={1.5}
                            />
                        }
                    >
                        Make an offer
                    </Button>
                </Link>
            </div>

            <div className="bg-background-muted border-border-light flex flex-col gap-1.5 rounded-md border p-2.5">
                <p className="text-text-muted flex items-center gap-1.5 text-xs">
                    <ShieldCheck
                        className="size-3 shrink-0"
                        strokeWidth={1.5}
                    />
                    Verified listing · identity and title checked
                </p>
                <p className="text-highlight-dark text-xs font-medium">
                    {responseTime}
                </p>
            </div>
        </section>
    );
}

ListingEnquiryCard.displayName = "ListingEnquiryCard";
