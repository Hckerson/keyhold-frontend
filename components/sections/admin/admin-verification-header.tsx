import { FilterPills } from "@/components/patterns/filter-pills";
import { PortalHeader } from "@/components/patterns/portal-header";
import { VERIFICATION_FILTERS } from "@/lib/config/verification-tones";
import { VERIFICATION_COPY } from "@/lib/data/admin-verifications";
import type { VerificationFilterKey } from "@/lib/types";

export interface AdminVerificationHeaderProps {
    reading: string;
    filter: VerificationFilterKey;
    counts: Record<VerificationFilterKey, number>;
    onFilterChange: (next: VerificationFilterKey) => void;
}

export function AdminVerificationHeader({
    reading,
    filter,
    counts,
    onFilterChange,
}: AdminVerificationHeaderProps) {
    return (
        <PortalHeader
            title={VERIFICATION_COPY.title}
            lede={VERIFICATION_COPY.lede}
            summary={reading}
            action={
                <FilterPills
                    filters={VERIFICATION_FILTERS}
                    active={filter}
                    onChange={onFilterChange}
                    counts={counts}
                />
            }
        />
    );
}

AdminVerificationHeader.displayName = "AdminVerificationHeader";
