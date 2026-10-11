import type { ChartTone } from "@/lib/config/chart-tones";
import type { MilestoneKind } from "@/lib/enums/enums";
import type { MessageSender, ThreadDocument } from "@/lib/types/message";
import type { MetricItem } from "@/lib/types/ui";
import type {
    DealMilestone,
    UpdateMilestoneInput,
} from "@/lib/validations/offer";

export type OfferStatus =
    | "submitted"
    | "countered"
    | "accepted"
    | "rejected"
    | "withdrawn";

export interface Offer {
    id: string;
    listingId: string;
    address: string;
    locality: string;
    photo: string | null;
    agent: string;
    agentPortrait: string | null;
    listPrice: number;
    offerPrice: number;
    counterPrice?: number;
    status: OfferStatus;
    minutesAgo: number;
    note: string;
}

export type MilestoneDetailsInput = Pick<
    UpdateMilestoneInput,
    "appraisedValue" | "note"
>;

export interface DealMilestoneControls {
    milestones: DealMilestone[];
    loading: boolean;
    busy: boolean;
    rejected?: string;
    progress?: number;
    onDateChange: (kind: MilestoneKind, date: string) => void;
    onToggleComplete: (milestone: DealMilestone) => void;
    onAttach: (kind: MilestoneKind, file: File) => void;
    onSaveDetails: (kind: MilestoneKind, input: MilestoneDetailsInput) => void;
}

export type OfferConfirmAction = "counter" | "accept";

export interface OfferResponse {
    responsePrice?: number;
    responseFeedback?: string;
}

export interface OfferAgentShare {
    id: string;
    name: string;
    portrait: string | null;
    value: string;
    count: number;
    percent: number;
    tone: ChartTone;
}

export type OfferStageFilter = "all" | "open" | "closed";

export type OfferStatusFilter = OfferStatus | "all";

export interface OfferBook {
    label: string;
    value: number;
    liveCount: number;
    awaitingCount: number;
    href: string;
}

export interface OfferPosition {
    id: string;
    address: string;
    image: string;
    offered: number;
    list: number;
    status: OfferStatus;
}

export type TimelineTone = "neutral" | "success" | "warning" | "info" | "error";

export interface TimelineEntry {
    id: string;
    label: string;
    date: string;
    time: string;
    amount?: number;
    note?: string;
    tone: TimelineTone;
}

export interface ComparisonRow {
    key: string;
    label: string;
    yours: string;
    counter: string;
    detail: string;
}

export interface ThreadMessage {
    id: string;
    senderRole: MessageSender;
    author: string;
    content: string;
    timestamp: string;
    documents: ThreadDocument[];
}

export interface OfferDetail {
    id: string;
    connectionId: string;
    address: string;
    listPrice: number;
    offerPrice: number;
    counterPrice?: number;
    status: OfferStatus;
    agent: string;
    timeline: TimelineEntry[];
    comparison: ComparisonRow[];
    messages: ThreadMessage[];
    terms: MetricItem[];
}
