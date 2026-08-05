import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BUYER_FIRST_NAME } from "@/lib/data/dashboard-overview";

const OVERVIEW_LEDE = "Your offers, viewings and saved-search activity";
const BROWSE_HREF = "/search";
const BROWSE_LABEL = "Browse properties";

export function DashboardOverviewHeader() {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    Welcome back, {BUYER_FIRST_NAME}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {OVERVIEW_LEDE}
                </p>
            </div>
            <Link href={BROWSE_HREF}>
                <Button variant="primary" size="sm">
                    {BROWSE_LABEL}
                </Button>
            </Link>
        </header>
    );
}

DashboardOverviewHeader.displayName = "DashboardOverviewHeader";
