import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

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
        <PortalHeader
            title={OFFERS_TITLE}
            lede={OFFERS_LEDE}
            summary={summary}
            action={
                <Link
                    href={NEW_OFFER_HREF}
                    className={buttonVariants({
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
            }
        />
    );
}

OffersHeader.displayName = "OffersHeader";
