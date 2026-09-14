"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportModal } from "@/components/features/shared/report-modal";
import { REPORT_COPY, type ReportTarget } from "@/lib/config/report";

export interface ReportTriggerProps {
    targets: ReportTarget[];
    className?: string;
}

export function ReportTrigger({ targets, className }: ReportTriggerProps) {
    const [open, setOpen] = useState(false);

    if (targets.length === 0) return null;

    return (
        <>
            <Button
                type="button"
                emphasis="quiet"
                size="sm"
                className={className}
                onClick={() => setOpen(true)}
            >
                <Flag className="size-3" strokeWidth={1.5} aria-hidden="true" />
                {REPORT_COPY.trigger}
            </Button>

            <ReportModal
                open={open}
                targets={targets}
                onClose={() => setOpen(false)}
            />
        </>
    );
}

ReportTrigger.displayName = "ReportTrigger";
