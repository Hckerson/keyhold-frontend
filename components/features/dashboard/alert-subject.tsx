import Link from "next/link";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import type { Alert } from "@/lib/types";
import { PUBLIC_ROUTES } from "@/lib/constants";

export interface AlertSubjectProps {
    alert: Alert;
}

export function AlertSubject({ alert }: AlertSubjectProps) {
    const body = (
        <>
            <ListingThumb src={alert.photo} alt={alert.address} />
            <span className="min-w-0 truncate text-xs">
                <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                    {alert.address}
                </span>
                {alert.locality && (
                    <span className="text-text-muted">
                        {" · "}
                        {alert.locality}
                    </span>
                )}
            </span>
        </>
    );

    return alert.listingId ? (
        <Link
            href={PUBLIC_ROUTES.listing(alert.listingId)}
            className="group flex min-w-0 items-center gap-2"
        >
            {body}
        </Link>
    ) : (
        <span className="group flex min-w-0 items-center gap-2">{body}</span>
    );
}

AlertSubject.displayName = "AlertSubject";
