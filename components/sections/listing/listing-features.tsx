import { Check } from "lucide-react";

export function ListingFeatures({ features }: { features: string[] }) {
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
