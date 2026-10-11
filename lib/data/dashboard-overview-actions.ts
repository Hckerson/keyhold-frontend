import { CalendarDays, FileText, MessageSquare, Search } from "lucide-react";
import type {
    Alert,
    AlertType,
    JourneyTask,
    QuickAction,
    TaskState,
} from "@/lib/types";
import { BUYER_ROUTES, PUBLIC_ROUTES } from "@/lib/constants";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { Transaction } from "@/lib/validations/transaction";

const TRIGGERED_LIMIT = 4;

export const TRIGGERED_ALERT_TYPES: AlertType[] = ["PRICE_DROP", "NEW_LISTING"];

const taskState = (done: boolean, active: boolean): TaskState =>
    done ? "done" : active ? "active" : "todo";

export const journeyTasksFrom = (
    connections: ConnectionListItem[],
    savedCount: number,
    purchases: Transaction[],
): JourneyTask[] => {
    const hasEnquiry = connections.length > 0;
    const hasViewing = connections.some(
        (connection) => connection._count.viewings > 0,
    );
    const hasOffer = connections.some(
        (connection) => connection._count.offers > 0,
    );
    const hasPurchase = purchases.length > 0;

    const steps: [string, string, string, boolean][] = [
        [
            "shortlist",
            "Save homes you like",
            BUYER_ROUTES.saved,
            savedCount > 0,
        ],
        ["enquire", "Reach out to an agent", PUBLIC_ROUTES.search, hasEnquiry],
        ["viewing", "Book a viewing", BUYER_ROUTES.viewings, hasViewing],
        ["offer", "Submit an offer", BUYER_ROUTES.offers, hasOffer],
        ["escrow", "Open the transaction", BUYER_ROUTES.offers, hasPurchase],
    ];

    const firstOpen = steps.findIndex(([, , , done]) => !done);

    return steps.map(([id, label, href, done], index) => ({
        id,
        label,
        href,
        state: taskState(done, index === firstOpen),
    }));
};

export const triggeredAlertsFrom = (alerts: Alert[]): Alert[] =>
    alerts
        .filter((alert) => TRIGGERED_ALERT_TYPES.includes(alert.type))
        .sort(
            (a, b) =>
                Number(!b.read) - Number(!a.read) ||
                a.minutesAgo - b.minutesAgo,
        )
        .slice(0, TRIGGERED_LIMIT);

export const buyerQuickActions: QuickAction[] = [
    {
        id: "browse",
        label: "Browse properties",
        href: PUBLIC_ROUTES.search,
        icon: Search,
        tone: "accent",
    },
    {
        id: "offers",
        label: "Manage offers",
        href: BUYER_ROUTES.offers,
        icon: FileText,
        tone: "neutral",
    },
    {
        id: "viewings",
        label: "View all viewings",
        href: BUYER_ROUTES.viewings,
        icon: CalendarDays,
        tone: "neutral",
    },
    {
        id: "messages",
        label: "Messages",
        href: BUYER_ROUTES.messages,
        icon: MessageSquare,
        tone: "neutral",
    },
];
