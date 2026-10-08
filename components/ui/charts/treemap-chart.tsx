"use client";

import { ResponsiveContainer, Treemap, type TreemapNode } from "recharts";
import { TreemapTile } from "@/components/ui/charts/treemap-tile";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";
import type { ChartMark } from "@/lib/types";

const NODE_GAP = 2;

export interface TreemapChartProps {
    data: ChartMark[];
    label: string;
    height?: number;
    className?: string;
}

export function TreemapChart({
    data,
    label,
    height = 156,
    className,
}: TreemapChartProps) {
    const mounted = useMounted();
    const drawn = data.filter((mark) => mark.value > 0);
    const marks = new Map(drawn.map((mark) => [mark.id, mark]));

    const renderTile = (node: TreemapNode) => {
        const mark = marks.get(node.name);
        if (node.depth === 0 || !mark) return <g />;
        return (
            <TreemapTile
                mark={mark}
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
            />
        );
    };

    return (
        <div
            role="img"
            aria-label={label}
            className={cn("w-full", className)}
            style={{ height }}
        >
            {mounted && drawn.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                        data={drawn.map(({ id, value }) => ({ id, value }))}
                        dataKey="value"
                        nameKey="id"
                        nodeGap={NODE_GAP}
                        isAnimationActive={false}
                        content={renderTile}
                    />
                </ResponsiveContainer>
            )}
        </div>
    );
}

TreemapChart.displayName = "TreemapChart";
