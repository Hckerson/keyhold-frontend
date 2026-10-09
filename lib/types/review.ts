import type { StatusTone } from "@/lib/types/ui";

export interface Fact {
    label: string;
    value: string;
    href?: string;
    alarm?: boolean;
}

export interface ReviewStatus {
    tone: StatusTone;
    label: string;
}

export interface ReviewQueueItem {
    id: string;
    title: string;
    caption: string;
    moment: string;
    status?: ReviewStatus;
}

export interface ReviewOutcomeView extends ReviewStatus {
    date: string;
    detail?: string;
    noteHeading: string;
    note: string | null;
}

export interface ReviewClock {
    open: boolean;
    openedAt: string;
    decidedAt: string | null;
}
