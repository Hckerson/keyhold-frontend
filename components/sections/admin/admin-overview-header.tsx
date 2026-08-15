import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const OVERVIEW_TITLE = "Admin Console";
const OVERVIEW_LEDE =
    "What the marketplace moved, what it owes a decision, and what is holding it up";
const REPORTS_ACTION = "Platform Reports";

export interface AdminOverviewHeaderProps {
    summary: string;
}

export function AdminOverviewHeader({ summary }: AdminOverviewHeaderProps) {
    return (
        <PortalHeader
            title={OVERVIEW_TITLE}
            lede={OVERVIEW_LEDE}
            summary={summary}
            action={
                <Link
                    href="/admin/reports"
                    className={buttonVariants({
                        variant: "primary",
                        size: "sm",
                    })}
                >
                    {REPORTS_ACTION}
                </Link>
            }
        />
    );
}

AdminOverviewHeader.displayName = "AdminOverviewHeader";
