import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export interface PanelLinkProps {
    href: string;
    label: string;
}

export function PanelLink({ href, label }: PanelLinkProps) {
    return (
        <Link
            href={href}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
            {label}
        </Link>
    );
}

PanelLink.displayName = "PanelLink";
