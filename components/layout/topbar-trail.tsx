"use client";

import Link from "next/link";
import type { TrailCrumb } from "@/lib/types";

export interface TopbarTrailProps {
    crumbs: TrailCrumb[];
}

export function TopbarTrail({ crumbs }: TopbarTrailProps) {
    return (
        <nav aria-label="Breadcrumb" className="min-w-0 select-none">
            <ol className="flex min-w-0 items-center gap-1.5 text-xs">
                {crumbs.map((crumb, index) => (
                    <li
                        key={`${index}-${crumb.href}`}
                        className="flex min-w-0 items-center gap-1.5"
                    >
                        {index > 0 && (
                            <span
                                aria-hidden="true"
                                className="text-border-dark shrink-0"
                            >
                                /
                            </span>
                        )}

                        {crumb.current ? (
                            <span
                                aria-current="page"
                                className="text-text truncate font-medium"
                            >
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                href={crumb.href}
                                className="text-text-muted hover:text-text focus-visible:ring-accent ease-smooth truncate rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

TopbarTrail.displayName = "TopbarTrail";
