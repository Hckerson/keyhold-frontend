import { ANALYTICS_PERIOD } from "@/lib/data/agent-analytics";

const ANALYTICS_TITLE = "Performance Analytics";
const ANALYTICS_LEDE = "Production, market position and quarterly pacing";

export function AnalyticsHeader() {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {ANALYTICS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {ANALYTICS_LEDE}
                </p>
            </div>
            <p className="micro-label">{ANALYTICS_PERIOD}</p>
        </header>
    );
}

AnalyticsHeader.displayName = "AnalyticsHeader";
