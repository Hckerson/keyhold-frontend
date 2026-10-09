import { FilterPills } from "@/components/patterns/filter-pills";
import { PortalHeader } from "@/components/patterns/portal-header";
import { DISPUTE_FILTERS } from "@/lib/config/dispute-tones";
import { DISPUTE_COPY } from "@/lib/data/admin-disputes";
import type { DisputeFilterKey } from "@/lib/types";

export interface AdminDisputesHeaderProps {
    reading: string;
    filter: DisputeFilterKey;
    counts: Record<DisputeFilterKey, number>;
    onFilterChange: (next: DisputeFilterKey) => void;
}

export function AdminDisputesHeader({
    reading,
    filter,
    counts,
    onFilterChange,
}: AdminDisputesHeaderProps) {
    return (
        <PortalHeader
            title={DISPUTE_COPY.title}
            lede={DISPUTE_COPY.lede}
            summary={reading}
            action={
                <FilterPills
                    filters={DISPUTE_FILTERS}
                    active={filter}
                    onChange={onFilterChange}
                    counts={counts}
                />
            }
        />
    );
}

AdminDisputesHeader.displayName = "AdminDisputesHeader";
