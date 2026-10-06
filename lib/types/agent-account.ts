import type { LucideIcon } from "lucide-react";
import type {
    NotificationCadence,
    NotificationChannel,
} from "@/lib/config/account-tones";
import type { NotificationType } from "@/lib/enums/enums";

export type NotificationRuleId = NotificationType;

export interface NotificationRule {
    id: NotificationRuleId;
    channel: NotificationChannel;
    title: string;
    cadence: NotificationCadence;
}

export type NotificationState = Record<NotificationRuleId, boolean>;

export interface ProfileSignal {
    id: string;
    icon: LucideIcon;
    label: string;
    impact: number;
    complete: boolean;
}
