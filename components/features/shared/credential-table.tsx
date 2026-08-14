import { CredentialRow } from "@/components/features/shared/credential-row";
import type { AccountCredential } from "@/lib/types";

export interface CredentialTableProps {
    credentials: readonly AccountCredential[];
    heading: string;
    caption: string;
}

export function CredentialTable({
    credentials,
    heading,
    caption,
}: CredentialTableProps) {
    return (
        <table className="table-flush w-full min-w-lg table-fixed">
            <caption className="sr-only">{caption}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        {heading}
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
