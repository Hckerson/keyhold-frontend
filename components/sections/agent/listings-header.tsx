import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const LISTINGS_TITLE = "My Listings";
const LISTINGS_LEDE = "Exposure, demand and time on market across your book";
const ADD_ACTION = "List New Property";
const ADD_HREF = "/agent/listings/new";

export interface ListingsHeaderProps {
    summary: string;
}

export function ListingsHeader({ summary }: ListingsHeaderProps) {
    return (
        <PortalHeader
            title={LISTINGS_TITLE}
            lede={LISTINGS_LEDE}
            summary={summary}
            action={
                <Link
                    href={ADD_HREF}
                    className={buttonVariants({
                        emphasis: "solid",
                        tone: "accent",
                        size: "sm",
                    })}
                >
                    {ADD_ACTION}
                </Link>
            }
        />
    );
}

ListingsHeader.displayName = "ListingsHeader";
