import { ToneReading } from "@/components/patterns/tone-reading";
import { matchTone } from "@/lib/config/saved-tones";

const MATCH_NOUN = "match";

export interface SavedMatchMarkProps {
    score: number;
    className?: string;
}

export function SavedMatchMark({ score, className }: SavedMatchMarkProps) {
    return (
        <ToneReading
            value={`${score}%`}
            tone={matchTone(score)}
            label={`${score}% ${MATCH_NOUN}`}
            className={className}
        />
    );
}

SavedMatchMark.displayName = "SavedMatchMark";
