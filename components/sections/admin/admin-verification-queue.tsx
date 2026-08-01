import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { VerificationList } from "@/components/features/admin/verification-list";
import { verifications } from "@/lib/data/admin-verifications";

export function AdminVerificationQueue() {
    const pending = verifications.filter(
        (request) => request.status === "pending",
    ).length;
    const approved = verifications.filter(
        (request) => request.status === "approved",
    ).length;

    return (
        <div className="space-y-3">
            <PageHeader
                title="Tier Verifications"
                description={`${pending} pending · ${approved} approved`}
                action={
                    <Button variant="secondary" size="sm">
                        Export Report
                    </Button>
                }
            />

            <VerificationList requests={verifications} />
        </div>
    );
}

AdminVerificationQueue.displayName = "AdminVerificationQueue";
