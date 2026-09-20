export const CALENDAR_OUTCOMES = ["connected", "denied", "failed"] as const;

export type CalendarOutcome = (typeof CALENDAR_OUTCOMES)[number];

export const calendarOutcomeFrom = (
    value: string | undefined,
): CalendarOutcome | undefined =>
    CALENDAR_OUTCOMES.find((outcome) => outcome === value);

export const CALENDAR_SYNC_COPY = {
    title: "Google Calendar",
    connectedLede: "Confirmed viewings are written to your calendar",
    failingLede: "Confirmed viewings are not reaching your calendar",
    idleLede: "Send confirmed viewings to your Google Calendar",
    unavailableLede: "Calendar sync isn't configured on this environment",
    connect: "Connect",
    disconnect: "Disconnect",
    account: "Account",
    lastSynced: "Last synced",
    lastFailed: "Last failed",
    neverSynced: "Not yet synced",
    reconnect: "Reconnecting usually clears this.",
    outcomes: {
        connected: "Connected. New confirmations will appear shortly.",
        denied: "Access wasn't granted, so nothing was connected.",
        failed: "The connection didn't complete. Try once more.",
    },
} as const;
