"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface FilterGroup {
    id: string;
    label: string;
    options: Array<{
        id: string;
        label: string;
        count?: number;
    }>;
}

interface FilterPanelProps {
    title?: string;
    groups: FilterGroup[];
    onFilterChange?: (groupId: string, selectedOptions: string[]) => void;
    onReset?: () => void;
    className?: string;
}

export type { FilterPanelProps };

export function FilterPanel({
    title = "Filters",
    groups,
    onFilterChange,
    onReset,
    className,
}: FilterPanelProps) {
    return (
        <Card className={cn("", className)}>
            <div className="border-border flex items-center justify-between border-b p-6">
                <h3 className="text-h6 font-body font-semibold">{title}</h3>
                <button
                    onClick={onReset}
                    className="text-text-secondary hover:text-accent text-sm transition-colors"
                >
                    Reset
                </button>
            </div>

            <div className="space-y-4 p-6">
                <Accordion>
                    {groups.map((group) => (
                        <AccordionItem key={group.id} value={group.id}>
                            <AccordionTrigger>{group.label}</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-3">
                                    {group.options.map((option) => (
                                        <label
                                            key={option.id}
                                            className="flex cursor-pointer items-center gap-3"
                                        >
                                            <Checkbox
                                                onChange={(e) => {
                                                    onFilterChange?.(
                                                        group.id,
                                                        e.currentTarget.checked
                                                            ? [option.id]
                                                            : [],
                                                    );
                                                }}
                                            />
                                            <span className="text-text text-sm">
                                                {option.label}
                                            </span>
                                            {option.count !== undefined && (
                                                <span className="text-text-muted ml-auto text-xs">
                                                    {option.count}
                                                </span>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="border-border flex gap-3 border-t p-6">
                <Button variant="primary" size="sm" className="flex-1">
                    Apply
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                    Cancel
                </Button>
            </div>
        </Card>
    );
}
