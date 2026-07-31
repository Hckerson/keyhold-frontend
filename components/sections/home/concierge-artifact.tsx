import { Check } from "lucide-react";
import type {
    BriefLine,
    CompletionMilestone,
    ConciergeArtifact as ConciergeArtifactData,
    ItinerarySlot,
    ShortlistItem,
} from "@/lib/data/home-concierge";
import { propertyImage } from "@/lib/data/sample-images";
import { cn } from "@/lib/utils";

const SLOT_TONE: Record<ItinerarySlot["tone"], string> = {
    settled: "bg-accent-light text-accent",
    pending: "bg-highlight-light text-highlight-dark",
};

const microLabelClass =
    "font-mono text-[10px] tracking-[0.14em] uppercase text-text-muted";

function BriefSheet({ lines }: { lines: BriefLine[] }) {
    return (
        <dl className="flex flex-col">
            {lines.map((line) => (
                <div
                    key={line.label}
                    className="border-border-light flex flex-col gap-1 border-b py-2.5 first:pt-0 last:border-b-0 last:pb-0"
                >
                    <dt className={microLabelClass}>{line.label}</dt>
                    <dd className="text-text-secondary text-xs leading-[1.6]">
                        {line.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

function ShortlistStack({ items }: { items: ShortlistItem[] }) {
    return (
        <ul className="flex flex-col gap-2.5">
            {items.map((item) => (
                <li key={item.address} className="flex items-center gap-3">
                    <img
                        src={propertyImage(item.imageSeed)}
                        alt=""
                        className="border-border-light size-10 shrink-0 rounded-sm border object-cover"
                    />
                    <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="text-text truncate text-xs font-semibold">
                            {item.address}
                        </p>
                        <p className={microLabelClass}>{item.note}</p>
                    </div>
                    {item.offMarket && (
                        <span className="text-highlight-dark ml-auto shrink-0 font-mono text-[10px] tracking-[0.12em] uppercase">
                            Off-market
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}

function ItineraryStrip({ slots }: { slots: ItinerarySlot[] }) {
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

function CompletionLedger({
    milestones,
}: {
    milestones: CompletionMilestone[];
}) {
    return (
        <ul className="flex flex-col gap-2.5">
            {milestones.map((milestone) => (
                <li key={milestone.label} className="flex items-center gap-2.5">
                    {milestone.done ? (
                        <Check
                            size={12}
                            strokeWidth={1.5}
                            className="text-accent shrink-0"
                        />
                    ) : (
                        <span className="border-highlight-dark size-3 shrink-0 rounded-full border" />
                    )}
                    <span
                        className={cn(
                            "text-xs",
                            milestone.done
                                ? "text-text-secondary"
                                : "text-text font-semibold",
                        )}
                    >
                        {milestone.label}
                    </span>
                </li>
            ))}
        </ul>
    );
}

function ArtifactBody({ artifact }: { artifact: ConciergeArtifactData }) {
    switch (artifact.kind) {
        case "brief":
            return <BriefSheet lines={artifact.lines} />;
        case "shortlist":
            return <ShortlistStack items={artifact.items} />;
        case "itinerary":
            return <ItineraryStrip slots={artifact.slots} />;
        case "completion":
            return <CompletionLedger milestones={artifact.milestones} />;
    }
}

export function ConciergeArtifact({
    artifact,
}: {
    artifact: ConciergeArtifactData;
}) {
    return (
        <div className="border-border-light bg-background-muted rounded-md border p-3">
            <ArtifactBody artifact={artifact} />
        </div>
    );
}

ConciergeArtifact.displayName = "ConciergeArtifact";
