import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { SignalDomainMark } from "@/components/features/admin/signal-domain-mark";
import { SignalExposure } from "@/components/features/admin/signal-exposure";
import { SignalSeverityMark } from "@/components/features/admin/signal-severity-mark";
import type { PlatformSignal } from "@/lib/types";

const OPEN_LABEL = "Open";

export interface PlatformSignalRowProps {
    signal: PlatformSignal;
}

export function PlatformSignalRow({ signal }: PlatformSignalRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <SignalSeverityMark severity={signal.severity} />
            </td>
            <td className="text-text truncate py-0 pl-3 text-xs font-medium">
                {signal.title}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {signal.subject}
            </td>
            <td className="py-0 pl-3">
                <SignalDomainMark domain={signal.domain} />
            </td>
            <td className="py-0 pl-3 text-right">
                <SignalExposure amount={signal.exposure} />
            </td>
            <td className="py-0 pl-3 text-right">
                <AgeMark minutes={signal.ageMinutes} />
            </td>
            <td className="py-0 pl-3">
                <Link
                    href={signal.href}
                    aria-label={`${OPEN_LABEL} ${signal.title}`}
                    className="ease-smooth focus-visible:ring-accent text-text-muted hover:bg-accent-light hover:text-accent ml-auto grid size-5 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <ChevronRight
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </Link>
            </td>
        </tr>
    );
}

PlatformSignalRow.displayName = "PlatformSignalRow";
