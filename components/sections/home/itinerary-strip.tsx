import type { ItinerarySlot } from "@/lib/data/home-concierge";
import { cn } from "@/lib/utils";

const SLOT_TONE: Record<ItinerarySlot["tone"], string> = {
    settled: "bg-accent-light text-accent",
    pending: "bg-accent-light text-accent",
};

export interface ItineraryStripProps {
    slots: ItinerarySlot[];
}

export function ItineraryStrip({ slots }: ItineraryStripProps) {
    return (
        <ul className="flex flex-col">
            {slots.map((slot) => (
                <li
                    key={slot.when}
                    className="border-border-light flex items-center gap-3 border-b py-2.5 first:pt-0 last:border-b-0 last:pb-0"
                >
                    <span className="text-text w-[4.5rem] shrink-0 font-mono text-[10px] tracking-[0.12em] uppercase tabular-nums">
                        {slot.when}
                    </span>
                    <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                        {slot.address}
                    </span>
                    <span
                        className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase",
                            SLOT_TONE[slot.tone],
                        )}
                    >
                        {slot.state}
                    </span>
                </li>
            ))}
        </ul>
    );
}
