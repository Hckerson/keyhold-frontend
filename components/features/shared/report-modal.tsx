"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/forms/select";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import {
    REPORT_COPY,
    REPORT_REASONS,
    type ReportReason,
    type ReportTarget,
} from "@/lib/config/report";
import { useCreateFlag } from "@/lib/hooks/use-flags";

export interface ReportModalProps {
    open: boolean;
    targets: ReportTarget[];
    onClose: () => void;
}

export function ReportModal({ open, targets, onClose }: ReportModalProps) {
    const createFlag = useCreateFlag();

    const [targetId, setTargetId] = useState(targets[0]?.id ?? "");
    const [reason, setReason] = useState<ReportReason>(REPORT_REASONS[0].value);
    const [details, setDetails] = useState("");

    const target = targets.find((item) => item.id === targetId) ?? targets[0];

    const submit = () => {
        if (!target) return;
        createFlag.mutate(
            {
                type: target.type,
                targetId: target.id,
                reason,
                details: details.trim() || undefined,
            },
            {
                onSuccess: () => {
                    setDetails("");
                    onClose();
                },
            },
        );
    };

    return (
        <Modal
            open={open}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-title"
        >
            <ModalContent>
                <ModalHeader>
                    <ModalTitle id="report-title">
                        {REPORT_COPY.title}
                    </ModalTitle>
                    <p className="text-text-secondary mt-1 text-xs">
                        {REPORT_COPY.lede}
                    </p>
                </ModalHeader>
                <ModalBody className="space-y-3">
                    {targets.length > 1 && (
                        <Select
                            label={REPORT_COPY.targetLabel}
                            options={targets.map((item) => ({
                                value: item.id,
                                label: item.label,
                            }))}
                            value={target?.id ?? ""}
                            onChange={setTargetId}
                        />
                    )}

                    <Select
                        label={REPORT_COPY.reasonLabel}
                        options={REPORT_REASONS}
                        value={reason}
                        onChange={setReason}
                    />

                    <TextareaField
                        id="report-details"
                        name="reportDetails"
                        label={REPORT_COPY.detailsLabel}
                        rows={4}
                        value={details}
                        onChange={(event) => setDetails(event.target.value)}
                        placeholder={REPORT_COPY.detailsPlaceholder}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} disabled={createFlag.isPending}>
                        {REPORT_COPY.cancel}
                    </Button>
                    <Button
                        emphasis="solid"
                        tone="error"
                        isLoading={createFlag.isPending}
                        onClick={submit}
                    >
                        {REPORT_COPY.submit}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

ReportModal.displayName = "ReportModal";
