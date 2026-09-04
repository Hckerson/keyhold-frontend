"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    SearchRail,
    type SearchRailProps,
} from "@/components/sections/search/search-rail";
import { cn } from "@/lib/utils";

export interface SearchFilterAsideProps extends Omit<
    SearchRailProps,
    "className"
> {
    open: boolean;
    onToggle: () => void;
}

export function SearchFilterAside({
    open,
    onToggle,
    ...rail
}: SearchFilterAsideProps) {
    return (
        <aside className="lg:col-span-1">
            <Button
                type="button"
                size="sm"
                onClick={onToggle}
                className="desk-hidden w-full"
                icon={SlidersHorizontal}
            >
                {open ? "Hide filters" : "Filters"}
            </Button>

            <div
                className={cn(
                    "ease-smooth mt-2 grid transition-[grid-template-rows] duration-200 lg:mt-0 lg:block",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
            >
                <div className="overflow-hidden lg:overflow-visible">
                    <SearchRail {...rail} />
                </div>
            </div>
        </aside>
    );
}

SearchFilterAside.displayName = "SearchFilterAside";
