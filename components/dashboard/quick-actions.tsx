import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuickAction {
    label: string;
    href: string;
    icon: LucideIcon;
    description?: string;
}

export function QuickActions({
    actions,
    className,
}: {
    actions: QuickAction[];
    className?: string;
}) {
    return (
        <ul className={cn("flex flex-col gap-1", className)}>
            {actions.map((action) => {
                const Icon = action.icon;
                return (
                    <li key={action.href}>
                        <Link
                            href={action.href}
                            className="group hover:bg-background ease-smooth flex items-center gap-3 rounded-lg p-2 transition-colors"
                        >
                            <span className="bg-accent-light text-accent grid size-7 shrink-0 place-items-center rounded-lg">
                                <Icon size={14} strokeWidth={1.5} />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="text-text text-xs font-medium">
                                    {action.label}
                                </p>
                                {action.description && (
                                    <p className="text-text-muted truncate text-xs">
                                        {action.description}
                                    </p>
                                )}
                            </div>
                            <ChevronRight
                                size={12}
                                strokeWidth={1.5}
                                className="text-text-muted group-hover:text-accent ease-smooth shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

QuickActions.displayName = "QuickActions";
