import { DEAL_STAGES } from "@/lib/config/deal-stages";
import type { DealStage } from "@/lib/types/deal";

export const nextStageOf = (stage: DealStage) => {
    const index = DEAL_STAGES.findIndex((item) => item.id === stage);
    return DEAL_STAGES[(index + 1) % DEAL_STAGES.length];
};
