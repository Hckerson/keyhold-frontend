import { Check, Minus, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const ICON_SIZE = 12;

const CONNECTED = "Connected";
const MISSING = "Missing keys";
const OPTIONAL = "Not set up";

export interface IntegrationRowProps {
    integration: IntegrationStatus;
}

export function IntegrationRow({ integration }: IntegrationRowProps) {
    const { configured, required } = integration;
    const Icon = configured ? Check : required ? TriangleAlert : Minus;
    const tone = configured
        ? "text-success"
        : required
          ? "text-error"
          : "text-text-muted";

    return (
        <tr className="ease-smooth hover:bg-background-muted h-9 transition-colors">
            <td className="text-text truncate py-0 text-xs font-medium">
                {integration.label}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {integration.capability}
            </td>
            <td className="py-0 pl-3 text-right">
                <span
                    className={cn(
                        "inline-flex items-center gap-1 text-xs font-medium",
                        tone,
                    )}
                >
                    <Icon size={ICON_SIZE} strokeWidth={1.5} />
                    {configured ? CONNECTED : required ? MISSING : OPTIONAL}
                </span>
            </td>
        </tr>
    );
}

IntegrationRow.displayName = "IntegrationRow";
