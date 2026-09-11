import { CalendarConsole } from "@/components/sections/agent/calendar-console";
import { calendarOutcomeFrom } from "@/lib/config/calendar-sync";

export default async function AgentCalendarPage({
    searchParams,
}: {
    searchParams: Promise<{ calendar?: string }>;
}) {
    const { calendar } = await searchParams;

    return <CalendarConsole calendarOutcome={calendarOutcomeFrom(calendar)} />;
}
