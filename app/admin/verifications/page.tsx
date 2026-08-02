import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { VerificationList } from "@/components/features/admin/verification-list";
import { verifications } from "@/lib/data/admin-verifications";

export default function AdminVerificationsPage() {
    const pending = verifications.filter((v) => v.status === "pending").length;
    const approved = verifications.filter(
        (v) => v.status === "approved",
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
