import { BriefSheet } from "@/components/sections/home/brief-sheet";
import { CompletionLedger } from "@/components/sections/home/completion-ledger";
import { ItineraryStrip } from "@/components/sections/home/itinerary-strip";
import { ShortlistStack } from "@/components/sections/home/shortlist-stack";
import type { ConciergeArtifact } from "@/lib/data/home-concierge";

export interface ArtifactBodyProps {
    artifact: ConciergeArtifact;
}

export function ArtifactBody({ artifact }: ArtifactBodyProps) {
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
