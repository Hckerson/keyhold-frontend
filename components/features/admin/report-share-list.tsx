import { formatCount } from "@/lib/utils";
import type { ReportShare } from "@/lib/types";

export interface ReportShareListProps {
    label: string;
    shares: ReportShare[];
}

export function ReportShareList({ label, shares }: ReportShareListProps) {
    return (
        <dl aria-label={label} className="divide-border-light -my-1 divide-y">
            {shares.map((share) => (
                <div
                    key={share.id}
                    className="flex h-9 items-center gap-3 text-xs"
                >
                    <dt className="text-text min-w-0 flex-1 truncate">
                        {share.label}
                    </dt>
                    <dd className="text-text font-medium tabular-nums">
                        {formatCount(share.count)}
                    </dd>
                    <dd className="text-text-muted w-9 text-right tabular-nums">
                        {share.share}%
                    </dd>
                </div>
            ))}
        </dl>
    );
}

ReportShareList.displayName = "ReportShareList";
