import { BedDouble, Bath, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCount } from "@/lib/utils/format";

export interface PropertySpecsProps {
    beds: number;
    baths: number;
    sqft: number;
    className?: string;
}

export function PropertySpecs({
    beds,
    baths,
    sqft,
    className,
}: PropertySpecsProps) {
    const specs = [
        { icon: BedDouble, value: beds, label: beds === 1 ? "Bed" : "Beds" },
        { icon: Bath, value: baths, label: baths === 1 ? "Bath" : "Baths" },
        { icon: Ruler, value: formatCount(sqft), label: "Sq Ft" },
    ];
    return (
        <div
            className={cn(
                "flex flex-wrap items-center gap-x-4 gap-y-1",
                className,
            )}
        >
            {specs.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                    <Icon
                        size={12}
                        strokeWidth={1.5}
                        className="text-text-muted shrink-0"
                    />
                    <span className="text-text-secondary text-xs whitespace-nowrap">
                        <span className="text-text font-medium tabular-nums">
                            {value}
                        </span>{" "}
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}

PropertySpecs.displayName = "PropertySpecs";
