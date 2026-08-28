import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const LEADS_TITLE = "Lead Pipeline";
const LEADS_LEDE = "Every prospect ranked by temperature, stage and fit";
const ADD_ACTION = "Add Lead";

export interface LeadsHeaderProps {
    summary: string;
    onAdd: () => void;
}

export function LeadsHeader({ summary, onAdd }: LeadsHeaderProps) {
    return (
        <PortalHeader
            title={LEADS_TITLE}
            lede={LEADS_LEDE}
            summary={summary}
            action={
                <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={onAdd}
                >
                    {ADD_ACTION}
                </Button>
            }
        />
    );
}

LeadsHeader.displayName = "LeadsHeader";
