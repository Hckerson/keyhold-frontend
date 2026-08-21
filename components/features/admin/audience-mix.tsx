import {
    DonutChart,
    type DonutSegment,
} from "@/components/ui/charts/donut-chart";
import { ProgressBar } from "@/components/ui/progress-bar";
import { chartToneVar } from "@/lib/config/chart-tones";
import { formatCount } from "@/lib/utils";

const DONUT_SIZE = 132;

export interface AudienceMixProps {
    roles: DonutSegment[];
    tiers: DonutSegment[];
    total: string;
    tierLabel: string;
}

function TierRow({ tier, share }: { tier: DonutSegment; share: number }) {
    return (
        <li className="flex items-center gap-2.5 py-2">
            <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-sm"
                style={{ background: chartToneVar[tier.tone] }}
            />
            <span className="text-text w-20 shrink-0 truncate text-xs font-medium">
                {tier.name}
            </span>
            <ProgressBar value={share} tone={tier.tone} className="flex-1" />
            <span className="text-text w-10 shrink-0 text-right text-xs font-semibold tabular-nums">
                {formatCount(tier.value)}
            </span>
            <span className="micro-label w-8 shrink-0 text-right tabular-nums">
                {share}%
            </span>
        </li>
    );
}

export function AudienceMix({
    roles,
    tiers,
    total,
    tierLabel,
}: AudienceMixProps) {
    const tierTotal = tiers.reduce((sum, tier) => sum + tier.value, 0);

    return (
        <div className="flex flex-col gap-3">
            <DonutChart
                data={roles}
                total={total}
                unit="users"
                size={DONUT_SIZE}
            />

            <div className="border-border-dark border-t pt-2">
                <p className="micro-label">{tierLabel}</p>
                <ul className="divide-border divide-y">
                    {tiers.map((tier) => (
                        <TierRow
                            key={tier.name}
                            tier={tier}
                            share={Math.round((tier.value / tierTotal) * 100)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

AudienceMix.displayName = "AudienceMix";
