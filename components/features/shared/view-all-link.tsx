import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface ViewAllLinkProps {
    href: string;
}

export function ViewAllLink({ href }: ViewAllLinkProps) {
    return (
        <Link
            href={href}
            className="text-accent hover:text-accent-dark ease-smooth inline-flex items-center gap-1 text-xs font-medium transition-colors"
        >
            View all
            <ChevronRight size={12} strokeWidth={1.5} />
        </Link>
    );
}

ViewAllLink.displayName = "ViewAllLink";
