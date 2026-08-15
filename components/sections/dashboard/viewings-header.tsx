import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const VIEWINGS_TITLE = "Viewings";
const VIEWINGS_LEDE =
    "Every tour on the book, from the next front door to the last walkthrough";
const BOOK_ACTION = "Book a Viewing";

export interface ViewingsHeaderProps {
    summary: string;
}

export function ViewingsHeader({ summary }: ViewingsHeaderProps) {
    return (
        <PortalHeader
            title={VIEWINGS_TITLE}
            lede={VIEWINGS_LEDE}
            summary={summary}
            action={
                <Link
                    href="/search"
                    className={buttonVariants({
                        variant: "primary",
                        size: "sm",
                    })}
                >
                    {BOOK_ACTION}
                </Link>
            }
        />
    );
}

ViewingsHeader.displayName = "ViewingsHeader";
