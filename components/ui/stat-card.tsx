import Link from "next/link";
import { StatBody, type StatBodyProps } from "@/components/ui/stat-body";
import { cn } from "@/lib/utils";

export interface StatCardProps extends StatBodyProps {
    className?: string;
}

export function StatCard(props: StatCardProps) {
    const { href, featured, className } = props;
    const shell = cn(
        "group ease-smooth flex flex-col gap-2 rounded-xl border transition-colors duration-200",
        featured
            ? "bg-background border-accent/30 p-4 shadow-md"
            : "bg-background-muted border-border-light p-3 shadow-sm",
        href &&
            "focus-visible:ring-accent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none",
        href && !featured && "hover:border-border",
        className,
    );

    return href ? (
        <Link href={href} className={shell}>
            <StatBody {...props} />
        </Link>
    ) : (
        <div className={shell}>
            <StatBody {...props} />
        </div>
    );
}

StatCard.displayName = "StatCard";
