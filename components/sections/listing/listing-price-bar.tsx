"use client";

import { useState } from "react";
import { Check, Heart, MapPin, MessageSquare, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionEyebrow } from "@/components/patterns/section-heading";
import { cn } from "@/lib/utils";
import { formatUsd } from "@/lib/utils/format";

interface ListingPriceBarProps {
    price: number;
    statusLabel: string;
    address: string;
    locality: string;
    zipcode: string;
    typeLabel: string;
    saved: boolean;
    savePending: boolean;
    onToggleSave: () => void;
}

export function ListingPriceBar({
    price,
    statusLabel,
    address,
    locality,
    zipcode,
    typeLabel,
    saved,
    savePending,
    onToggleSave,
}: ListingPriceBarProps) {
    const [copied, setCopied] = useState(false);

    const share = () => {
        const url = window.location.href;
        if (navigator.share) {
            void navigator.share({ title: address, url });
            return;
        }
        void navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <section
            aria-label="Price and status"
            className="border-border bg-background/90 z-sticky sticky top-22 flex flex-wrap items-center justify-between gap-4 rounded-xl border px-4 py-3 shadow-sm backdrop-blur-md"
        >
            <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="highlight" size="sm">
                        {statusLabel}
                    </Badge>
                    <SectionEyebrow tone="muted">{typeLabel}</SectionEyebrow>
                </div>
                <p className="text-h4 font-display text-text leading-none font-light tabular-nums">
                    {formatUsd(price)}
                </p>
                <p className="text-text-secondary flex items-center gap-1.5 text-xs">
                    <MapPin
                        className="text-text-muted size-3 shrink-0"
                        strokeWidth={1.5}
                    />
                    <span className="truncate">
                        {address}, {locality} {zipcode}
                    </span>
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Button
                    type="button"
                    onClick={onToggleSave}
                    disabled={savePending}
                    aria-pressed={saved}
                >
                    <Heart
                        strokeWidth={1.5}
                        className={cn(
                            "size-3",
                            saved && "fill-highlight text-highlight",
                        )}
                    />
                    {saved ? "Saved" : "Save"}
                </Button>
                <Button
                    type="button"
                    onClick={share}
                    icon={copied ? Check : Share2}
                >
                    {copied ? "Link copied" : "Share"}
                </Button>
                <Button asChild emphasis="solid" tone="accent">
                    <a href="#agent">
                        <MessageSquare className="size-3" strokeWidth={1.5} />
                        Message agent
                    </a>
                </Button>
            </div>
        </section>
    );
}

ListingPriceBar.displayName = "ListingPriceBar";
