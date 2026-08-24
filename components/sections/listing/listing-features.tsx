import { Check, ListChecks } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

const EMPTY_TITLE = "Feature schedule not published";
const EMPTY_LEDE =
    "The full specification for this residence is released with the dossier. Ask the listing advisor for a copy.";

export function ListingFeatures({ features }: { features: string[] }) {
    if (features.length === 0) {
        return (
            <EmptyState
                icon={ListChecks}
                title={EMPTY_TITLE}
                description={EMPTY_LEDE}
            />
        );
    }

    return (
        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {features.map((feature) => (
                <li
                    key={feature}
                    className="border-border flex items-center gap-2 border-b py-2"
                >
                    <Check
                        className="text-accent size-3 shrink-0"
                        strokeWidth={1.5}
                    />
                    <span className="text-text text-xs">{feature}</span>
                </li>
            ))}
        </ul>
    );
}

ListingFeatures.displayName = "ListingFeatures";
