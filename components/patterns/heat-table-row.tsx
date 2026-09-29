import Link from "next/link";
import { cn } from "@/lib/utils";
import type { HeatRow } from "@/lib/types";

const HEAT_CEILING = 30;

const heatFill = (intensity: number) =>
    `color-mix(in oklab, var(--color-accent) ${Math.round(intensity * HEAT_CEILING)}%, transparent)`;

export interface HeatTableRowProps {
    row: HeatRow;
}

export function HeatTableRow({ row }: HeatTableRowProps) {
    return (
        <tr className="h-9">
            <th scope="row" className="py-0 text-left font-normal">
                <Link
                    href={row.href}
                    className="text-text hover:text-accent focus-visible:ring-accent ease-smooth block truncate rounded-xs text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    {row.label}
                </Link>
            </th>
            {row.cells.map((cell) => (
                <td key={cell.key} className="px-0.5 py-0.5">
                    <span
                        className={cn(
                            "block rounded-xs px-2 py-1.5 text-right text-xs tabular-nums",
                            cell.intensity === 0
                                ? "text-text-muted"
                                : "text-text",
                            cell.intensity === 1 && "font-semibold",
                        )}
                        style={{ backgroundColor: heatFill(cell.intensity) }}
                    >
                        {cell.value}
                    </span>
                </td>
            ))}
            <td className="text-text-secondary truncate py-0 pl-3 text-right text-xs tabular-nums">
                {row.summary}
            </td>
        </tr>
    );
}

HeatTableRow.displayName = "HeatTableRow";
