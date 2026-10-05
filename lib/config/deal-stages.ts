import type { DealStage } from "@/lib/types/deal";
import type { StatusTone } from "@/lib/types";

export interface DealStageMeta {
    id: DealStage;
    label: string;
    tone: StatusTone;
}

export const DEAL_STAGES: DealStageMeta[] = [
    { id: "leads", label: "Leads", tone: "neutral" },
    { id: "offers", label: "Offers", tone: "info" },
    { id: "pending", label: "Pending", tone: "warning" },
    { id: "closed", label: "Closed", tone: "success" },
];
