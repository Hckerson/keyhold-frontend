import { cn } from "@/lib/utils";

export interface SparklineProps {
    data: number[];
    className?: string;
}

export function Sparkline({ data, className }: SparklineProps) {
    const width = 100;
    const height = 32;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    });

    const line = points.join(" ");
    const area = `0,${height} ${line} ${width},${height}`;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            className={cn("h-8 w-full overflow-visible", className)}
            fill="none"
        >
            <polygon points={area} className="fill-accent/10" />
            <polyline
                points={line}
                className="stroke-accent"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

Sparkline.displayName = "Sparkline";
