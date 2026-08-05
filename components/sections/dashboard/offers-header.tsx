import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const OFFERS_TITLE = "Offers";
const OFFERS_LEDE =
    "Every position you hold, what it is against ask, and who is holding it";
const NEW_OFFER_ACTION = "Make New Offer";
const NEW_OFFER_HREF = "/search";

export interface OffersHeaderProps {
    summary: string;
}

export function OffersHeader({ summary }: OffersHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {OFFERS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {OFFERS_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Link
                    href={NEW_OFFER_HREF}
                    className={buttonVariants({
                        variant: "secondary",
                        size: "sm",
                    })}
                >
                    <Plus
                        className="mr-1.5 size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {NEW_OFFER_ACTION}
                </Link>
            </div>
        </header>
    );
}

OffersHeader.displayName = "OffersHeader";
