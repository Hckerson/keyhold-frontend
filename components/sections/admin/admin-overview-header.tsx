import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const OVERVIEW_TITLE = "Admin Console";
const OVERVIEW_LEDE =
    "What the marketplace moved, what it owes a decision, and what is holding it up";
const REPORTS_ACTION = "Platform Reports";

export interface AdminOverviewHeaderProps {
    summary: string;
}

export function AdminOverviewHeader({ summary }: AdminOverviewHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {OVERVIEW_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {OVERVIEW_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Link
                    href="/admin/reports"
                    className={buttonVariants({
                        variant: "primary",
                        size: "sm",
                    })}
                >
                    {REPORTS_ACTION}
                </Link>
            </div>
        </header>
    );
}

AdminOverviewHeader.displayName = "AdminOverviewHeader";
