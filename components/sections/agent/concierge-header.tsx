import { Button } from "@/components/ui/button";

const CONCIERGE_TITLE = "VIP Concierge";
const CONCIERGE_LEDE =
    "White-glove coverage across your highest-value relationships";
const ADD_ACTION = "Add VIP Client";

export interface ConciergeHeaderProps {
    summary: string;
}

export function ConciergeHeader({ summary }: ConciergeHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {CONCIERGE_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {CONCIERGE_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Button type="button" variant="primary" size="sm">
                    {ADD_ACTION}
                </Button>
            </div>
        </header>
    );
}

ConciergeHeader.displayName = "ConciergeHeader";
