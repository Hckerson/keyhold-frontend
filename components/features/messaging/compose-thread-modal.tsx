"use client";

import { MessagesSquare } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
} from "@/components/ui/modal";
import { ConversationList } from "@/components/features/messaging/conversation-list";
import Link from "next/link";
import { COMPOSE_COPY as COPY } from "@/lib/data/messages";
import type { Conversation } from "@/lib/types";

export interface ComposeThreadModalProps {
    open: boolean;
    conversations: Conversation[];
    onClose: () => void;
    onSelect: (id: string) => void;
}

export function ComposeThreadModal({
    open,
    conversations,
    onClose,
    onSelect,
}: ComposeThreadModalProps) {
    return (
        <Modal
            open={open}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader className="p-4">
                <ModalTitle>{COPY.title}</ModalTitle>
            </ModalHeader>

            <ModalBody className="scroll-y max-h-[60vh] space-y-3 p-4">
                <p className="text-text-secondary text-xs">{COPY.hint}</p>

                {conversations.length > 0 ? (
                    <div className="border-border-light overflow-hidden rounded-lg border">
                        <ConversationList
                            conversations={conversations}
                            selectedId=""
                            onSelect={(id) => {
                                onSelect(id);
                                onClose();
                            }}
                        />
                    </div>
                ) : (
                    <EmptyState
                        icon={MessagesSquare}
                        title={COPY.emptyTitle}
                        description={COPY.emptyLede}
                        action={
                            <Link
                                href="/search"
                                className={buttonVariants({
                                    variant: "primary",
                                    size: "sm",
                                })}
                            >
                                {COPY.emptyAction}
                            </Link>
                        }
                    />
                )}
            </ModalBody>
        </Modal>
    );
}

ComposeThreadModal.displayName = "ComposeThreadModal";
