import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const LISTINGS_TITLE = "My Listings";
const LISTINGS_LEDE = "Exposure, demand and time on market across your book";
const ADD_ACTION = "List New Property";

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
                <Button type="button" variant="primary" size="sm">
                    {ADD_ACTION}
                </Button>
            }
        />
    );
}

ListingsHeader.displayName = "ListingsHeader";
