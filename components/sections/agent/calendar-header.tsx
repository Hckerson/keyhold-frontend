import { PortalHeader } from "@/components/patterns/portal-header";
import { Button } from "@/components/ui/button";

const CALENDAR_TITLE = "Calendar";
const CALENDAR_LEDE = "Viewings across your week, by day and by format";
const CREATE_LABEL = "Create event";

export interface CalendarHeaderProps {
    summary: string;
    onCreate: () => void;
}

export function CalendarHeader({ summary, onCreate }: CalendarHeaderProps) {
    return (
        <PortalHeader
            title={CALENDAR_TITLE}
            lede={CALENDAR_LEDE}
            summary={summary}
            action={
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    onClick={onCreate}
                >
                    {CREATE_LABEL}
                </Button>
            }
        />
    );
}

CalendarHeader.displayName = "CalendarHeader";
