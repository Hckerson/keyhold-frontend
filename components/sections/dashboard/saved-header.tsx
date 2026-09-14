import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { PUBLIC_ROUTES } from "@/lib/constants";

const SAVED_TITLE = "Saved Properties";
const SAVED_LEDE =
    "Price movement, search match and market state across the book you are watching";
const BROWSE_ACTION = "Continue Browsing";

export interface SavedHeaderProps {
    summary: string;
}

export function SavedHeader({ summary }: SavedHeaderProps) {
    return (
        <PortalHeader
            title={SAVED_TITLE}
            lede={SAVED_LEDE}
            summary={summary}
            action={
                <Link
                    href={PUBLIC_ROUTES.search}
                    className={buttonVariants({
                        emphasis: "solid",
                        tone: "accent",
                        size: "sm",
                    })}
                >
                    {BROWSE_ACTION}
                </Link>
            }
        />
    );
}

SavedHeader.displayName = "SavedHeader";
