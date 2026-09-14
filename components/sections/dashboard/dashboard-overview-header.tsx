import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { PUBLIC_ROUTES } from "@/lib/constants";

const OVERVIEW_LEDE = "Your offers, viewings and saved-search activity";
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
                    href={PUBLIC_ROUTES.search}
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
