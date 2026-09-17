"use client";

import { chartToneFill } from "@/lib/config/chart-tones";
import { POI_KIND_KEYS, POI_KINDS } from "@/lib/config/nearby-tones";
import { cn } from "@/lib/utils";
import { formatCount } from "@/lib/utils/format";
import type { PoiKind } from "@/lib/types";

const GROUP_LABEL = "Places shown on the map";

export interface NearbyKindTogglesProps {
    counts: Record<PoiKind, number>;
    shown: readonly PoiKind[];
    onToggle: (kind: PoiKind) => void;
}

export function NearbyKindToggles({
    counts,
    shown,
    onToggle,
}: NearbyKindTogglesProps) {
    return (
        <div role="group" aria-label={GROUP_LABEL} className="tile-quad gap-2">
            {POI_KIND_KEYS.map((kind) => {
                const { label, icon: Icon, tone } = POI_KINDS[kind];
                const active = shown.includes(kind);

                return (
                    <button
                        key={kind}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onToggle(kind)}
                        className={cn(
                            "ease-smooth focus-visible:ring-accent flex h-9 items-center gap-2 rounded-md border px-2.5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                            active
                                ? "border-border bg-background text-text"
                                : "border-border-light text-text-muted hover:text-text-secondary bg-transparent",
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={cn(
                                "size-2 shrink-0 rounded-full",
                                active ? chartToneFill[tone] : "bg-border-dark",
                            )}
                        />
                        <Icon
                            className="size-4 shrink-0"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1 truncate text-xs font-medium">
                            {label}
                        </span>
                        <span className="text-xs tabular-nums">
                            {formatCount(counts[kind])}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

NearbyKindToggles.displayName = "NearbyKindToggles";
