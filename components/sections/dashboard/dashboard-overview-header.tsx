import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { BUYER_FIRST_NAME } from "@/lib/data/dashboard-overview";

const OVERVIEW_LEDE = "Your offers, viewings and saved-search activity";
const BROWSE_HREF = "/search";
const BROWSE_LABEL = "Browse properties";

export function DashboardOverviewHeader() {
    return (
        <PortalHeader
            title={`Welcome back, ${BUYER_FIRST_NAME}`}
            lede={OVERVIEW_LEDE}
            action={
                <Link
                    href={BROWSE_HREF}
                    className={buttonVariants({
                        variant: "primary",
                        size: "sm",
                    })}
                >
                    {BROWSE_LABEL}
                </Link>
            }
        />
    );
}

DashboardOverviewHeader.displayName = "DashboardOverviewHeader";
