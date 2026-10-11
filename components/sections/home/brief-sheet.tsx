import type { BriefLine } from "@/lib/data/home-concierge";
import { CONCIERGE_ARTIFACT_LABEL } from "@/lib/config/home-concierge";

export interface BriefSheetProps {
    lines: BriefLine[];
}

export function BriefSheet({ lines }: BriefSheetProps) {
    return (
        <dl className="flex flex-col">
            {lines.map((line) => (
                <div
                    key={line.label}
                    className="border-border-light flex flex-col gap-1 border-b py-2.5 first:pt-0 last:border-b-0 last:pb-0"
                >
                    <dt className={CONCIERGE_ARTIFACT_LABEL}>{line.label}</dt>
                    <dd className="text-text-secondary text-xs leading-[1.6]">
                        {line.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
