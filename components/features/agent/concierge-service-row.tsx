import { ProgressBar } from "@/components/ui/progress-bar";
import { chartToneText } from "@/lib/config/chart-tones";
import type { ConciergeService } from "@/lib/data/agent-concierge";
import { cn, percentOf } from "@/lib/utils";

export interface ConciergeServiceRowProps {
    service: ConciergeService;
}

export function ConciergeServiceRow({ service }: ConciergeServiceRowProps) {
    const Icon = service.icon;
    const load = percentOf(service.openRequests, service.capacity);

    return (
        <li className="flex h-9 items-center gap-2">
            <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn("size-3 shrink-0", chartToneText[service.tone])}
            />
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {service.label}
            </span>
            <ProgressBar
                value={load}
                tone={service.tone}
                className="w-10 shrink-0"
            />
            <span className="text-text-secondary w-10 shrink-0 text-right text-xs tabular-nums">
                {service.openRequests}/{service.capacity}
            </span>
        </li>
    );
}

ConciergeServiceRow.displayName = "ConciergeServiceRow";
