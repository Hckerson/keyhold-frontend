import { ArtifactBody } from "@/components/sections/home/artifact-body";
import type { ConciergeArtifact as ConciergeArtifactData } from "@/lib/data/home-concierge";

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
