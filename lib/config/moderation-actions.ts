import { Check, PenLine, X, type LucideIcon } from "lucide-react";
import type { DecisionMode } from "@/lib/types";

export const MODERATION_ACTION: Record<
    "approve" | DecisionMode,
    { label: string; icon: LucideIcon }
> = {
    approve: { label: "Approve", icon: Check },
    changes: { label: "Request Changes", icon: PenLine },
    reject: { label: "Reject", icon: X },
};
