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
    REPORT_SECTION_CHOICES,
    REPORT_SECTION_IDS,
    type ReportSectionId,
} from "@/lib/config/report-export";

export interface ReportExportModalProps {
    open: boolean;
    span: string;
    onClose: () => void;
    onExport: (sections: ReportSectionId[]) => void;
}

export function ReportExportModal({
    open,
    span,
    onClose,
    onExport,
}: ReportExportModalProps) {
    const [sections, setSections] = useState<ReportSectionId[]>([
        ...REPORT_SECTION_IDS,
    ]);

    const toggleSection = (id: ReportSectionId) =>
        setSections((current) =>
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
                        choices={REPORT_SECTION_CHOICES}
                        selected={sections}
                        onToggle={toggleSection}
                    />
                </LabelledBlock>
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
