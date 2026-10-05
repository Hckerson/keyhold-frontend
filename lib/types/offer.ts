import type { ChartTone } from "@/lib/config/chart-tones";
import type { MilestoneKind } from "@/lib/enums/enums";
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
