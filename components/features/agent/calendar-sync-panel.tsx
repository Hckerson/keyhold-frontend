import { Button, buttonVariants } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { StatusDot } from "@/components/patterns/status-dot";
import {
    CALENDAR_SYNC_COPY as COPY,
    type CalendarOutcome,
} from "@/lib/config/calendar-sync";
import { calendarConnectUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CalendarStatus } from "@/lib/validations/calendar";

const NO_ACCOUNT = "—";

export interface CalendarSyncPanelProps {
    status?: CalendarStatus;
    outcome?: CalendarOutcome;
    disconnecting: boolean;
    onDisconnect: () => void;
}

const ledeFor = (status?: CalendarStatus) => {
    if (!status) return COPY.idleLede;
    if (!status.available) return COPY.unavailableLede;
    return status.connected ? COPY.connectedLede : COPY.idleLede;
};

export function CalendarSyncPanel({
    status,
    outcome,
    disconnecting,
    onDisconnect,
}: CalendarSyncPanelProps) {
    const connected = status?.connected === true;
    const message = outcome === "connected" && !connected ? undefined : outcome;

    return (
        <Panel
            title={COPY.title}
            description={ledeFor(status)}
            action={
                status?.available &&
                (connected ? (
                    <Button
                        type="button"
                        emphasis="quiet"
                        tone="neutral"
                        isLoading={disconnecting}
                        onClick={onDisconnect}
                    >
                        {COPY.disconnect}
                    </Button>
                ) : (
                    <a
                        href={calendarConnectUrl}
                        className={buttonVariants({ size: "sm" })}
                    >
                        {COPY.connect}
                    </a>
                ))
            }
        >
            {connected && (
                <PanelInset>
                    <div className="flex h-9 items-center gap-2">
                        <StatusDot tone="success" />
                        <span className="micro-label">{COPY.account}</span>
                        <span className="text-text min-w-0 flex-1 truncate text-right text-xs font-medium">
                            {status?.email ?? NO_ACCOUNT}
                        </span>
                    </div>
                </PanelInset>
            )}

            {message && (
                <p
                    role="status"
                    className={cn(
                        "text-xs",
                        message === "connected" ? "text-success" : "text-error",
                    )}
                >
                    {COPY.outcomes[message]}
                </p>
            )}
        </Panel>
    );
}

CalendarSyncPanel.displayName = "CalendarSyncPanel";
