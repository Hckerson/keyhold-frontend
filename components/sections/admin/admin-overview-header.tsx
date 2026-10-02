import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { ADMIN_ROUTES } from "@/lib/constants";

const OVERVIEW_TITLE = "Admin Console";
const OVERVIEW_LEDE =
    "What waits on a decision, what is holding the platform up, what it moved and who is on it";
const REPORTS_ACTION = "Platform Reports";

export function AdminOverviewHeader() {
    return (
        <PortalHeader
            title={OVERVIEW_TITLE}
            lede={OVERVIEW_LEDE}
            action={
                <Button asChild emphasis="solid" tone="accent">
                    <Link href={ADMIN_ROUTES.reports}>{REPORTS_ACTION}</Link>
                </Button>
            }
        />
    );
}

AdminOverviewHeader.displayName = "AdminOverviewHeader";
