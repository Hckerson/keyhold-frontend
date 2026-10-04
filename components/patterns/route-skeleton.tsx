"use client";

import { usePathname } from "next/navigation";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { consoleSkeletonFor } from "@/lib/config/console-skeletons";

export function RouteSkeleton() {
    return <ConsoleSkeleton variant={consoleSkeletonFor(usePathname())} />;
}

RouteSkeleton.displayName = "RouteSkeleton";
