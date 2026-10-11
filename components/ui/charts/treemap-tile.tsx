import { chartToneVar, chartToneWash } from "@/lib/config/chart-tones";
import type { ChartMark } from "@/lib/types";

const RADIUS = 6;
const PAD = 10;
const SWATCH = 8;
const FIT = { width: 72, label: 30, value: 50, caption: 66 };

export interface TreemapTileProps {
    mark: ChartMark;
    x: number;
    y: number;
    width: number;
    height: number;
}

export function TreemapTile({ mark, x, y, width, height }: TreemapTileProps) {
    const roomy = width >= FIT.width;

    return (
        <g>
            <title>
                {[mark.label, mark.display, mark.caption]
                    .filter(Boolean)
                    .join(" · ")}
            </title>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={RADIUS}
                fill={chartToneWash[mark.tone]}
            />
            {roomy && height >= FIT.label && (
                <>
                    <rect
                        x={x + PAD}
                        y={y + PAD + 2}
                        width={SWATCH}
                        height={SWATCH}
                        rx={2}
                        fill={chartToneVar[mark.tone]}
                    />
                    <text
                        x={x + PAD + SWATCH + 6}
                        y={y + PAD + 10}
                        fontSize={12}
                        fill="var(--color-text-secondary)"
                    >
                        {mark.label}
                    </text>
                </>
            )}
            {roomy && height >= FIT.value && (
                <text
                    x={x + PAD}
                    y={y + PAD + 34}
                    fontSize={20}
                    fontWeight={300}
                    fontFamily="var(--font-display)"
                    fill="var(--color-text)"
                >
                    {mark.display}
                </text>
            )}
            {roomy && height >= FIT.caption && mark.caption && (
                <text
                    x={x + PAD}
                    y={y + PAD + 50}
                    fontSize={12}
                    fill="var(--color-text-muted)"
                >
                    {mark.caption}
                </text>
            )}
        </g>
    );
}

TreemapTile.displayName = "TreemapTile";
