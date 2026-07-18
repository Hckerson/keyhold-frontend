import { BedDouble, Bath, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

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
        { icon: Ruler, value: sqft.toLocaleString(), label: "Sq Ft" },
    ];
    return (
        <div className={cn("flex items-center gap-5", className)}>
            {specs.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                    <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-text-muted shrink-0"
                    />
                    <span className="text-text-secondary text-sm">
                        <span className="text-text font-medium">{value}</span>{" "}
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}

PropertySpecs.displayName = "PropertySpecs";
