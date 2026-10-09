import { FilterPills } from "@/components/patterns/filter-pills";
import { PortalHeader } from "@/components/patterns/portal-header";
import { FLAG_FILTERS } from "@/lib/config/flag-tones";
import { FLAG_COPY } from "@/lib/data/admin-flags";
import type { FlagFilterKey } from "@/lib/types";

export interface AdminFlagsHeaderProps {
    reading: string;
    filter: FlagFilterKey;
    counts: Record<FlagFilterKey, number>;
    onFilterChange: (next: FlagFilterKey) => void;
}

export function AdminFlagsHeader({
    reading,
    filter,
    counts,
    onFilterChange,
}: AdminFlagsHeaderProps) {
    return (
        <PortalHeader
            title={FLAG_COPY.title}
            lede={FLAG_COPY.lede}
            summary={reading}
            action={
                <FilterPills
                    filters={FLAG_FILTERS}
                    active={filter}
                    onChange={onFilterChange}
                    counts={counts}
                />
            }
        />
    );
}

AdminFlagsHeader.displayName = "AdminFlagsHeader";
