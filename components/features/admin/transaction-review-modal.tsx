"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalFooter,
} from "@/components/ui/modal";
import { TransactionReviewBody } from "@/components/features/admin/transaction-review-body";
import { TransactionStatusMark } from "@/components/features/admin/transaction-status-mark";
import type { LedgerTransaction } from "@/lib/types";

const PAYOUT_ACTION = "Agent payout";
const CLOSE_ACTION = "Close";

export interface TransactionReviewModalProps {
    transaction?: LedgerTransaction;
    onClose: () => void;
}

export function TransactionReviewModal({
    transaction,
    onClose,
}: TransactionReviewModalProps) {
    return (
        <Modal
            open={transaction !== undefined}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
            className="max-w-2xl"
        >
            {transaction && (
                <>
                    <ModalHeader className="p-4">
                        <ModalTitle>{transaction.property}</ModalTitle>
                        <div className="mt-1 flex items-center gap-2">
                            <TransactionStatusMark
                                status={transaction.status}
                            />
                            <span className="micro-label">
                                {transaction.reference}
                            </span>
                        </div>
                    </ModalHeader>

                    <TransactionReviewBody transaction={transaction} />

                    <ModalFooter className="gap-2 p-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                        >
                            {CLOSE_ACTION}
                        </Button>
                        <Link
                            href="/admin/payments"
                            className={buttonVariants({
                                variant: "primary",
                                size: "sm",
                            })}
                        >
                            {PAYOUT_ACTION}
                        </Link>
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

TransactionReviewModal.displayName = "TransactionReviewModal";
