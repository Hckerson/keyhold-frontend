"use client";

import { usePathname } from "next/navigation";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { consoleSkeletonFor } from "@/lib/config/console-skeletons";

export default function AdminLoading() {
    return <ConsoleSkeleton variant={consoleSkeletonFor(usePathname())} />;
}
