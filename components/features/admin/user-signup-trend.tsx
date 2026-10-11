import { DeltaChip } from "@/components/ui/delta-chip";
import { Sparkline } from "@/components/ui/charts/sparkline";
import { formatCount } from "@/lib/utils";
import type { UserSignupTrend as UserSignupTrendData } from "@/lib/types";

const SIGNUPS_SUFFIX = "joined in";
const SPARK_HEIGHT = 40;

export interface UserSignupTrendProps {
    signups: UserSignupTrendData;
}

export function UserSignupTrend({ signups }: UserSignupTrendProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
                <span className="font-display text-h5 text-text leading-none font-light tabular-nums">
                    {formatCount(signups.latest)}
                </span>
                <span className="text-text-muted text-xs">
                    {SIGNUPS_SUFFIX} {signups.latestLabel}
                </span>
                {signups.delta && (
                    <DeltaChip
                        size="sm"
                        value={signups.delta.label}
                        direction={signups.delta.direction}
                        className="ml-auto"
                    />
                )}
            </div>
            <Sparkline
                data={signups.months}
                tone="accent"
                height={SPARK_HEIGHT}
            />
        </div>
    );
}

UserSignupTrend.displayName = "UserSignupTrend";
