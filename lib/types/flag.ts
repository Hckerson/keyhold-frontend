import type {
    FlagStatus,
    FlagType,
    UserAccountStatus,
} from "@/lib/enums/enums";

export type FlagFilterKey = FlagStatus | "all";
export type FlagSettleMode = "resolve" | "dismiss";

export interface ReportedMember {
    kind: "USER";
    id: string;
    name: string;
    email: string;
    status: UserAccountStatus;
}

export interface ReportedMessage {
    kind: "MESSAGE";
    id: string;
    content: string;
    senderId: string;
}

export interface FlagReport {
    id: string;
    type: FlagType;
    status: FlagStatus;
    reason: string;
    details: string | null;
    reporter: string;
    reporterEmail: string | null;
    openedAt: string;
    decidedAt: string | null;
    target: ReportedMember | ReportedMessage | null;
}

export interface FlagAction {
    label: string;
    mode: FlagSettleMode;
    emphasis: "quiet" | "outline";
}

export interface FlagDecision {
    mode: FlagSettleMode;
    id: string;
}
