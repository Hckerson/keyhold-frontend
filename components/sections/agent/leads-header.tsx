import { Button } from "@/components/ui/button";

const LEADS_TITLE = "Lead Pipeline";
const LEADS_LEDE = "Every prospect ranked by temperature, stage and fit";
const ADD_ACTION = "Add Lead";

export interface LeadsHeaderProps {
    summary: string;
}

export function LeadsHeader({ summary }: LeadsHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {LEADS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {LEADS_LEDE}
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

LeadsHeader.displayName = "LeadsHeader";
