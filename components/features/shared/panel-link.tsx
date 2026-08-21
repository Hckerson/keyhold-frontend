import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PanelLinkProps {
    href: string;
    label: string;
}

export function PanelLink({ href, label }: PanelLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "group px-2",
            )}
        >
            {label}
            <ChevronRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="ease-smooth size-3 transition-transform duration-200 group-hover:translate-x-0.5"
            />
        </Link>
    );
}

PanelLink.displayName = "PanelLink";
