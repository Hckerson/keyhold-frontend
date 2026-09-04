"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { MetricCell } from "@/components/patterns/metric-cell";
import { UserAccountList } from "@/components/features/admin/user-account-list";
import { UserActivityMark } from "@/components/features/admin/user-activity-mark";
import { UserDealMark } from "@/components/features/admin/user-deal-mark";
import { UserStatusMark } from "@/components/features/admin/user-status-mark";
import { UserVolumeMeter } from "@/components/features/admin/user-volume-meter";
import { USER_ROLES, USER_STATUSES } from "@/lib/config/user-tones";
import { idleDays, joinedLabel, userNote } from "@/lib/data/admin-users";
import type { ManagedUser } from "@/lib/types";

const VOLUME_LABEL = "Lifetime volume";
const DEALS_LABEL = "Closed deals";
const ACTIVE_LABEL = "Last sign-in";
const JOINED_LABEL = "Joined";
const ACCOUNT_LABEL = "Account";
const CLOSE_ACTION = "Close";
const PROFILE_ACTION = "View profile";
const SUSPEND_ACTION = "Suspend";
const REACTIVATE_ACTION = "Reactivate";

export interface UserDetailModalProps {
    user?: ManagedUser;
    peak: number;
    onClose: () => void;
    onSuspend: (id: string) => void;
    onReactivate: (id: string) => void;
}

export function UserDetailModal({
    user,
    peak,
    onClose,
    onSuspend,
    onReactivate,
}: UserDetailModalProps) {
    const status = user ? USER_STATUSES[user.status] : null;
    const note = user ? userNote(user) : undefined;

    return (
        <Modal
            open={user !== undefined}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            className="max-w-lg"
        >
            {user && status && (
                <>
                    <ModalHeader className="p-4">
                        <ModalTitle>{user.name}</ModalTitle>
                        <div className="mt-1 flex items-center gap-2">
                            <UserStatusMark status={user.status} />
                            <span className="micro-label">
                                {USER_ROLES[user.role].label}
                            </span>
                        </div>
                    </ModalHeader>

                    <ModalBody className="scroll-y max-h-[60vh] space-y-4 p-4">
                        <div className="metric-strip bg-background border-border-light gap-3 rounded-md border p-3">
                            <MetricCell label={VOLUME_LABEL}>
                                <UserVolumeMeter
                                    volume={user.volume}
                                    peak={peak}
                                    className="justify-start"
                                />
                            </MetricCell>
                            <MetricCell label={DEALS_LABEL}>
                                <UserDealMark deals={user.transactions} />
                            </MetricCell>
                            <MetricCell label={ACTIVE_LABEL}>
                                <UserActivityMark days={idleDays(user)} />
                            </MetricCell>
                            <MetricCell label={JOINED_LABEL}>
                                <span className="truncate tabular-nums">
                                    {joinedLabel(user)}
                                </span>
                            </MetricCell>
                        </div>

                        {note && (
                            <Callout
                                variant={status.noteTone}
                                title={status.noteTitle}
                                description={note}
                            />
                        )}

                        <div>
                            <p className="micro-label">{ACCOUNT_LABEL}</p>
                            <div className="mt-1.5">
                                <UserAccountList user={user} />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter className="gap-2 p-4">
                        <Button
                            type="button"
                            emphasis="quiet"
                            onClick={onClose}
                        >
                            {CLOSE_ACTION}
                        </Button>
                        <Link
                            href={`/admin/users/${user.id}`}
                            className={buttonVariants({
                                size: "sm",
                            })}
                        >
                            {PROFILE_ACTION}
                        </Link>
                        {user.status === "suspended" ? (
                            <Button
                                type="button"
                                emphasis="solid"
                                tone="accent"
                                onClick={() => onReactivate(user.id)}
                            >
                                {REACTIVATE_ACTION}
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                tone="error"
                                onClick={() => onSuspend(user.id)}
                            >
                                {SUSPEND_ACTION}
                            </Button>
                        )}
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

UserDetailModal.displayName = "UserDetailModal";
