import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ContactRoute } from "@/lib/types";

const ACTION_CLASS =
    "text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth inline-flex w-fit items-center gap-1 rounded-xs text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

export interface ContactRouteRowProps {
    route: ContactRoute;
}

export function ContactRouteRow({ route }: ContactRouteRowProps) {
    const Icon = route.icon;
    const internal = route.href.startsWith("/");
    const Glyph = internal ? ArrowRight : ArrowUpRight;
    const action = (
        <>
            {route.action}
            <Glyph className="size-3" strokeWidth={1.5} aria-hidden="true" />
        </>
    );

    return (
        <li className="flex gap-3 p-3">
            <span className="border-border-light bg-background text-text-secondary grid size-8 shrink-0 place-items-center rounded-md border">
                <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-text text-xs font-semibold">
                        {route.label}
                    </span>
                    {route.note && (
                        <span className="micro-label">{route.note}</span>
                    )}
                </p>
                <p className="text-text-secondary text-xs leading-relaxed">
                    {route.detail}
                </p>
                {internal ? (
                    <Link href={route.href} className={ACTION_CLASS}>
                        {action}
                    </Link>
                ) : (
                    <a href={route.href} className={ACTION_CLASS}>
                        {action}
                    </a>
                )}
            </div>
        </li>
    );
}

ContactRouteRow.displayName = "ContactRouteRow";
