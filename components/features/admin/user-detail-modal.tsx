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
import { UserVolumeMark } from "@/components/features/admin/user-volume-mark";
import { USER_ROLES, USER_STATUSES } from "@/lib/config/user-tones";
import {
    idleDays,
    joinedLabel,
    userActionOf,
    userNote,
} from "@/lib/data/admin-users";
import { USER_DETAIL_COPY as COPY } from "@/lib/config/user-detail";
import type { ManagedUser } from "@/lib/types";

export interface UserDetailModalProps {
    user?: ManagedUser;
    peak: number;
    onClose: () => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function UserDetailModal({
    user,
    peak,
    onClose,
    onSuspend,
    reactivatingId,
    onReactivate,
}: UserDetailModalProps) {
    const status = user ? USER_STATUSES[user.status] : null;
    const note = user ? userNote(user) : undefined;
    const action = user ? userActionOf(user) : undefined;

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
                    <ModalHeader>
                        <ModalTitle>{user.name}</ModalTitle>
                        <div className="mt-1 flex items-center gap-2">
                            <UserStatusMark status={user.status} />
                            <span className="micro-label">
                                {USER_ROLES[user.role].label}
                            </span>
                        </div>
                    </ModalHeader>

                    <ModalBody className="scroll-y max-h-[60vh] space-y-4">
                        <div className="metric-strip bg-background border-border-light gap-3 rounded-md border p-3">
                            <MetricCell label={COPY.volume}>
                                <UserVolumeMark
                                    volume={user.volume}
                                    peak={peak}
                                    className="justify-start"
                                />
                            </MetricCell>
                            <MetricCell label={COPY.deals}>
                                <UserDealMark deals={user.transactions} />
                            </MetricCell>
                            <MetricCell label={COPY.active}>
                                <UserActivityMark days={idleDays(user)} />
                            </MetricCell>
                            <MetricCell label={COPY.joined}>
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
                            <p className="micro-label">{COPY.account}</p>
                            <div className="mt-1.5">
                                <UserAccountList user={user} />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            type="button"
                            emphasis="quiet"
                            onClick={onClose}
                        >
                            {COPY.close}
                        </Button>
                        <Link
                            href={`/admin/users/${user.id}`}
                            className={buttonVariants({
                                size: "sm",
                            })}
                        >
                            {COPY.profile}
                        </Link>
                        {action === "reactivate" && (
                            <Button
                                type="button"
                                emphasis="solid"
                                tone="accent"
                                isLoading={reactivatingId === user.id}
                                disabled={reactivatingId !== undefined}
                                onClick={() => onReactivate(user.id)}
                            >
                                {COPY.reactivate}
                            </Button>
                        )}
                        {action === "suspend" && (
                            <Button
                                type="button"
                                tone="error"
                                onClick={() => onSuspend(user.id)}
                            >
                                {COPY.suspend}
                            </Button>
                        )}
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

UserDetailModal.displayName = "UserDetailModal";
