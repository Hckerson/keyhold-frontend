export interface PayoutDealCellProps {
    deal: string;
    locality: string;
}

export function PayoutDealCell({ deal, locality }: PayoutDealCellProps) {
    return (
        <span className="flex min-w-0 items-baseline gap-2">
            <span className="text-text truncate">{deal}</span>
            {locality && (
                <span className="text-text-muted max-w-[45%] shrink-0 truncate">
                    {locality}
                </span>
            )}
        </span>
    );
}

PayoutDealCell.displayName = "PayoutDealCell";
