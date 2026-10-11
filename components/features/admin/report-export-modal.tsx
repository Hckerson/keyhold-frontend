"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { ChoiceChips } from "@/components/patterns/choice-chips";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import {
    REPORT_EXPORT_COPY as COPY,
    type ReportSectionChoice,
    type ReportSectionId,
} from "@/lib/config/report-export";

export interface ReportExportModalProps {
    open: boolean;
    span: string;
    choices: readonly ReportSectionChoice[];
    note?: string;
    onClose: () => void;
    onExport: (sections: ReportSectionId[]) => void;
}

export function ReportExportModal({
    open,
    span,
    choices,
    note,
    onClose,
    onExport,
}: ReportExportModalProps) {
    const [excluded, setExcluded] = useState<ReportSectionId[]>([]);
    const sections = choices
        .map((choice) => choice.id)
        .filter((id) => !excluded.includes(id));

    const toggleSection = (id: ReportSectionId) =>
        setExcluded((current) =>
            current.includes(id)
                ? current.filter((section) => section !== id)
                : [...current, id],
        );

    return (
        <Modal
            open={open}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader>
                <ModalTitle>{COPY.title}</ModalTitle>
            </ModalHeader>

            <ModalBody className="space-y-3">
                <p className="text-text-secondary text-xs">
                    {COPY.hint}, {span}
                </p>

                <LabelledBlock label={COPY.sections}>
                    <ChoiceChips
                        label={COPY.sections}
                        choices={choices}
                        selected={sections}
                        onToggle={toggleSection}
                    />
                </LabelledBlock>
                {note && <p className="text-text-muted text-xs">{note}</p>}
            </ModalBody>

            <ModalFooter className="gap-4">
                <Button type="button" onClick={onClose}>
                    {COPY.cancel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    disabled={sections.length === 0}
                    onClick={() => onExport(sections)}
                >
                    {COPY.confirm}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ReportExportModal.displayName = "ReportExportModal";
