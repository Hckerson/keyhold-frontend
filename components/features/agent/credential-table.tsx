import { CredentialRow } from "@/components/features/agent/credential-row";
import type { AgentCredential } from "@/lib/data/agent-account";

const TABLE_CAPTION =
    "Professional credentials by name, issuing body, verification state and time until renewal";

export interface CredentialTableProps {
    credentials: readonly AgentCredential[];
}

export function CredentialTable({ credentials }: CredentialTableProps) {
    return (
        <table className="table-flush w-full min-w-lg table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Credential
                    </th>
                    <th scope="col" className="micro-label w-36 pl-3 text-left">
                        Issuer
                    </th>
                    <th scope="col" className="micro-label w-20 pl-3 text-left">
                        State
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Renews
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {credentials.map((credential) => (
                    <CredentialRow
                        key={credential.id}
                        credential={credential}
                    />
                ))}
            </tbody>
        </table>
    );
}

CredentialTable.displayName = "CredentialTable";
