import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
}

export function ServiceCard({
    icon: Icon,
    title,
    description,
    className,
}: ServiceCardProps) {
    return (
        <div
            className={cn(
                "bg-background-muted border-border-light hover:border-border ease-smooth flex items-start gap-4 rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md",
                className,
            )}
        >
            <span className="bg-accent-light text-accent grid size-10 shrink-0 place-items-center rounded-lg">
                <Icon size={18} strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
                <h3 className="text-text text-sm font-medium">{title}</h3>
                <p className="text-text-secondary mt-1 text-xs">
                    {description}
                </p>
            </div>
        </div>
    );
}

ServiceCard.displayName = "ServiceCard";
