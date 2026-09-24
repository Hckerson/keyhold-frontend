import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const OVERVIEW_TITLE = "Admin Console";
const OVERVIEW_LEDE =
    "What the marketplace moved, what it owes a decision, and what is holding it up";
const REPORTS_ACTION = "Platform Reports";

export function AdminOverviewHeader() {
    return (
        <PortalHeader
            title={OVERVIEW_TITLE}
            lede={OVERVIEW_LEDE}
            action={
                <Button asChild emphasis="solid" tone="accent">
                    <Link href="/admin/reports">{REPORTS_ACTION}</Link>
                </Button>
            }
        />
    );
}

AdminOverviewHeader.displayName = "AdminOverviewHeader";
