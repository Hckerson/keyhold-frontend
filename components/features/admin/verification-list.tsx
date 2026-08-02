import { VerificationCard } from "@/components/features/admin/verification-card";
import type { VerificationRequest } from "@/lib/data/admin-verifications";

export interface VerificationListProps {
    requests: VerificationRequest[];
}

export function VerificationList({ requests }: VerificationListProps) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {requests.map((request) => (
                <VerificationCard key={request.id} request={request} />
            ))}
        </div>
    );
}

VerificationList.displayName = "VerificationList";
