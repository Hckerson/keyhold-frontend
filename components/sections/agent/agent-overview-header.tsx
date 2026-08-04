const AGENT_NAME = "Sarah";
const OVERVIEW_LEDE = "Your sales pipeline and performance overview";

export function AgentOverviewHeader() {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    Welcome back, {AGENT_NAME}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {OVERVIEW_LEDE}
                </p>
            </div>
        </header>
    );
}

AgentOverviewHeader.displayName = "AgentOverviewHeader";
