import { MaintenanceOperationRow } from "@/components/features/admin/maintenance-operation-row";
import type { MaintenanceOperation } from "@/lib/types";

export interface MaintenanceOperationListProps {
    operations: readonly MaintenanceOperation[];
}

export function MaintenanceOperationList({
    operations,
}: MaintenanceOperationListProps) {
    return (
        <ul className="mt-2.5 space-y-2">
            {operations.map((operation) => (
                <MaintenanceOperationRow
                    key={operation.id}
                    operation={operation}
                />
            ))}
        </ul>
    );
}

MaintenanceOperationList.displayName = "MaintenanceOperationList";
