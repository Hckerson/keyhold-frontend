import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const OVERVIEW_LEDE = "Your offers, viewings and saved-search activity";
const BROWSE_HREF = "/search";
const BROWSE_LABEL = "Browse properties";
const FALLBACK_NAME = "there";

export interface DashboardOverviewHeaderProps {
    name?: string;
}

export function DashboardOverviewHeader({
    name,
}: DashboardOverviewHeaderProps) {
    return (
        <PortalHeader
            title={`Welcome back, ${name ?? FALLBACK_NAME}`}
            lede={OVERVIEW_LEDE}
            action={
                <Link
                    href={BROWSE_HREF}
                    className={buttonVariants({
                        emphasis: "solid",
                        tone: "accent",
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
