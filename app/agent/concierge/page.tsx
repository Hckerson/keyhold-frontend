import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StepList } from "@/components/ui/step-list";
import { ConciergeServiceGrid } from "@/components/features/agent/concierge-service-grid";
import { ConciergeClientList } from "@/components/features/agent/concierge-client-list";
import {
    conciergeServices,
    conciergeTips,
    vipClients,
} from "@/lib/data/agent-concierge";

export default function VIPConciergePage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="VIP Concierge"
                description="Manage your premium clients and white-glove services"
                action={
                    <Button variant="primary" size="sm">
                        Add VIP Client
                    </Button>
                }
            />

            <ConciergeServiceGrid services={conciergeServices} />

            <ConciergeClientList clients={vipClients} />

            <Panel
                title="Concierge Best Practices"
                description="Tips for VIP client retention"
            >
                <StepList steps={conciergeTips} />
            </Panel>
        </div>
    );
}
