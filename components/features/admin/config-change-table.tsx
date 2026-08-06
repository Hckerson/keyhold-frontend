import { ConfigChangeRow } from "@/components/features/admin/config-change-row";
import type { ConfigChange } from "@/lib/types";

const TABLE_CAPTION =
    "Recent configuration changes by setting, who changed it, the values and how long ago";

export interface ConfigChangeTableProps {
    changes: readonly ConfigChange[];
}

export function ConfigChangeTable({ changes }: ConfigChangeTableProps) {
    return (
        <table className="table-flush w-full min-w-sm table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Setting
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Change
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Age
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {changes.map((change) => (
                    <ConfigChangeRow key={change.id} change={change} />
                ))}
            </tbody>
        </table>
    );
}

ConfigChangeTable.displayName = "ConfigChangeTable";
