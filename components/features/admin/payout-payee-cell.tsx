import { Avatar } from "@/components/ui/avatar";
import { initialsOf } from "@/lib/utils";

export interface PayoutPayeeCellProps {
    name: string;
}

export function PayoutPayeeCell({ name }: PayoutPayeeCellProps) {
    return (
        <span className="flex min-w-0 items-center gap-2.5">
            <Avatar
                size="xs"
                initials={initialsOf(name)}
                elevated={false}
                className="shrink-0"
            />
            <span className="text-text truncate font-medium">{name}</span>
        </span>
    );
}

PayoutPayeeCell.displayName = "PayoutPayeeCell";
