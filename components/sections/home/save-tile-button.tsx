"use client";

import { Heart } from "lucide-react";
import { useSavedToggle } from "@/lib/hooks/use-saved-toggle";
import { cn } from "@/lib/utils";

export interface SaveTileButtonProps {
    id: string;
    address: string;
}

export function SaveTileButton({ id, address }: SaveTileButtonProps) {
    const { isSaved, toggle, pending } = useSavedToggle();
    const saved = isSaved(id);

    return (
        <button
            type="button"
            onClick={() => toggle(id)}
            disabled={pending}
            aria-pressed={saved}
            aria-label={saved ? `Unsave ${address}` : `Save ${address}`}
            className="bg-sidebar/70 text-text-inverse ring-sidebar-border hover:text-highlight focus-visible:ring-highlight ease-smooth absolute top-3.5 right-3.5 z-20 grid size-8 place-items-center rounded-full ring-1 backdrop-blur-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            <Heart
                size={14}
                strokeWidth={1.5}
                className={cn(saved && "fill-highlight text-highlight")}
            />
        </button>
    );
}

SaveTileButton.displayName = "SaveTileButton";
