import { FLAG_COPY } from "@/lib/data/admin-flags";
import type { FlagReport } from "@/lib/types";

export interface FlagClaimProps {
    report: FlagReport;
}

export function FlagClaim({ report }: FlagClaimProps) {
    return (
        <div className="flex min-w-0 flex-col gap-5">
            {report.target?.kind === "MESSAGE" && (
                <section>
                    <h3 className="micro-label">{FLAG_COPY.messageHeading}</h3>
                    <blockquote className="bg-background-alt border-border-light text-text mt-2 rounded-lg rounded-tl-xs border px-3 py-2.5 text-sm leading-relaxed break-words">
                        {report.target.content}
                    </blockquote>
                </section>
            )}
            <section>
                <h3 className="micro-label">{FLAG_COPY.reasonHeading}</h3>
                <p className="text-text mt-2 text-sm">{report.reason}</p>
            </section>
            {report.details && (
                <section>
                    <h3 className="micro-label">{FLAG_COPY.wordsHeading}</h3>
                    <p className="text-text-secondary mt-2 max-w-prose text-xs leading-relaxed break-words">
                        {report.details}
                    </p>
                </section>
            )}
        </div>
    );
}

FlagClaim.displayName = "FlagClaim";
