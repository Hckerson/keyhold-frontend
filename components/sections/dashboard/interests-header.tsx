import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";
import { PUBLIC_ROUTES } from "@/lib/constants";

const INTERESTS_TITLE = "Interest";
const INTERESTS_LEDE =
    "Every introduction you have asked for, who is holding it, and how far it has moved";
const NEW_INTEREST_ACTION = "Find a Residence";

export interface InterestsHeaderProps {
    summary: string;
}

export function InterestsHeader({ summary }: InterestsHeaderProps) {
    return (
        <PortalHeader
            title={INTERESTS_TITLE}
            lede={INTERESTS_LEDE}
            summary={summary}
            action={
                <Link
                    href={PUBLIC_ROUTES.search}
                    className={buttonVariants({
                        size: "sm",
                    })}
                >
                    <Plus
                        className="mr-1.5 size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {NEW_INTEREST_ACTION}
                </Link>
            }
        />
    );
}

InterestsHeader.displayName = "InterestsHeader";
