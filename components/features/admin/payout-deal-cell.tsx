export interface PayoutDealCellProps {
    deal: string;
    locality: string;
}

export function PayoutDealCell({ deal, locality }: PayoutDealCellProps) {
    return (
        <span className="flex min-w-0 items-baseline gap-2">
            <span className="text-text truncate">{deal}</span>
            {locality && (
                <span className="text-text-muted shrink-0">{locality}</span>
            )}
        </span>
    );
}

PayoutDealCell.displayName = "PayoutDealCell";
