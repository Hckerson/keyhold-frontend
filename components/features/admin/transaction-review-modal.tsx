"use client";

import Link from "next/link";
import { format } from "date-fns";
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
import { AgeMark } from "@/components/features/admin/age-mark";
import { EscrowMeter } from "@/components/features/admin/escrow-meter";
import { TransactionFinancingMark } from "@/components/features/admin/transaction-financing-mark";
import { TransactionMilestoneList } from "@/components/features/admin/transaction-milestone-list";
import { TransactionPartyList } from "@/components/features/admin/transaction-party-list";
import { TransactionStatusMark } from "@/components/features/admin/transaction-status-mark";
import {
    dealAgeTone,
    TRANSACTION_STATUSES,
} from "@/lib/config/transaction-tones";
import {
    COMMISSION_RATE_LABEL,
    commissionOf,
} from "@/lib/data/admin-transactions";
import { formatMillions, formatThousands, parseLocalDate } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

const PRICE_LABEL = "Sale price";
const ESCROW_LABEL = "Escrow cleared";
const AGE_LABEL = "Open for";
const INITIATED_LABEL = "Initiated";
const CLOSE_LABEL = "Target close";
const FINANCING_LABEL = "Financing";
const MILESTONES_LABEL = "Escrow milestones";
const PARTIES_LABEL = "Parties";
const PAYOUT_ACTION = "Agent payout";
const CLOSE_ACTION = "Close";
const DATE_FORMAT = "MMM d, yyyy";

export interface TransactionReviewModalProps {
    transaction?: Transaction;
    onClose: () => void;
}

export function TransactionReviewModal({
    transaction,
    onClose,
}: TransactionReviewModalProps) {
    const meta = transaction && TRANSACTION_STATUSES[transaction.status];

    return (
        <Modal
            open={transaction !== undefined}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
            className="max-w-2xl"
        >
            {transaction && meta && (
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

                    <ModalBody className="scroll-y max-h-[60vh] space-y-4 p-4">
                        <div className="grid-orphan-fill bg-background border-border-light grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-5">
                            <MetricCell label={PRICE_LABEL}>
                                <span className="tabular-nums">
                                    {formatMillions(transaction.price, 2)}
                                </span>
                            </MetricCell>
                            <MetricCell
                                label={`Commission ${COMMISSION_RATE_LABEL}`}
                            >
                                <span className="tabular-nums">
                                    {formatThousands(commissionOf(transaction))}
                                </span>
                            </MetricCell>
                            <MetricCell label={ESCROW_LABEL}>
                                <EscrowMeter
                                    cleared={transaction.cleared.length}
                                    label={transaction.property}
                                    className="justify-start"
                                />
                            </MetricCell>
                            <MetricCell label={AGE_LABEL}>
                                <AgeMark
                                    minutes={transaction.ageMinutes}
                                    tone={
                                        meta.open
                                            ? dealAgeTone(
                                                  transaction.ageMinutes,
                                              )
                                            : "neutral"
                                    }
                                />
                            </MetricCell>
                            <MetricCell label={CLOSE_LABEL}>
                                <span className="truncate tabular-nums">
                                    {format(
                                        parseLocalDate(transaction.closingDate),
                                        DATE_FORMAT,
                                    )}
                                </span>
                            </MetricCell>
                        </div>

                        {meta.note && <Callout {...meta.note} />}

                        <div>
                            <p className="micro-label">{FINANCING_LABEL}</p>
                            <div className="mt-1.5">
                                <TransactionFinancingMark
                                    financing={transaction.financing}
                                />
                            </div>
                        </div>

                        <div>
                            <p className="micro-label">{MILESTONES_LABEL}</p>
                            <div className="mt-1.5">
                                <TransactionMilestoneList
                                    cleared={transaction.cleared}
                                />
                            </div>
                        </div>

                        <div>
                            <p className="micro-label">
                                {PARTIES_LABEL} · {INITIATED_LABEL}{" "}
                                {format(
                                    parseLocalDate(transaction.initiatedDate),
                                    DATE_FORMAT,
                                )}
                            </p>
                            <div className="mt-1.5">
                                <TransactionPartyList
                                    transaction={transaction}
                                />
                            </div>
                        </div>
                    </ModalBody>

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
