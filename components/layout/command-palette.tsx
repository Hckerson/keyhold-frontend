"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import type { CommandItem } from "@/lib/types";
import { Modal } from "@/components/ui/modal";
import { CommandPaletteRow } from "@/components/layout/command-palette-row";
import { COMMAND_PALETTE } from "@/lib/config/command-palette";

export interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    query: string;
    onQueryChange: (query: string) => void;
    items: CommandItem[];
    active: number;
    onActiveChange: (index: number) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function CommandPalette({
    open,
    onOpenChange,
    query,
    onQueryChange,
    items,
    active,
    onActiveChange,
    onKeyDown,
}: CommandPaletteProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    useEffect(() => {
        listRef.current
            ?.querySelector('[aria-selected="true"]')
            ?.scrollIntoView({ block: "nearest" });
    }, [active, items]);

    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            aria-label={COMMAND_PALETTE.label}
            className="max-w-lg"
        >
            <div className="border-border-light bg-background-alt flex h-11 shrink-0 items-center gap-2.5 border-b px-3">
                <Search
                    size={12}
                    strokeWidth={1.5}
                    className="text-text-muted shrink-0"
                />
                <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={COMMAND_PALETTE.placeholder}
                    aria-label={COMMAND_PALETTE.label}
                    aria-expanded
                    aria-controls={COMMAND_PALETTE.listId}
                    aria-activedescendant={items[active]?.id}
                    autoComplete="off"
                    className="text-text placeholder:text-text-muted min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
                />
                <kbd className="micro-label border-border-light bg-background shrink-0 rounded-xs border px-1 py-px">
                    {COMMAND_PALETTE.dismiss}
                </kbd>
            </div>

            <div
                ref={listRef}
                id={COMMAND_PALETTE.listId}
                role="listbox"
                aria-label={COMMAND_PALETTE.destinations}
                className="min-h-0 flex-1 overflow-y-auto p-2"
            >
                {items.map((item, index) => (
                    <CommandPaletteRow
                        key={item.id}
                        item={item}
                        active={index === active}
                        onActivate={() => onActiveChange(index)}
                    />
                ))}
            </div>
        </Modal>
    );
}

CommandPalette.displayName = "CommandPalette";
