import { StatusBadge } from "@/components/ui/status-badge";
import { AgeMark } from "@/components/features/shared/age-mark";
import { CREDENTIAL_STATES, expiryTone } from "@/lib/config/account-tones";
import type { AccountCredential } from "@/lib/types";

const UNISSUED_LABEL = "Not issued";

export interface CredentialRowProps {
    credential: AccountCredential;
}

export function CredentialRow({ credential }: CredentialRowProps) {
    const { label, tone } = CREDENTIAL_STATES[credential.state];

    return (
        <tr className="ease-smooth hover:bg-background-muted h-9 transition-colors">
            <td className="py-0">
                <span className="text-text block truncate text-xs font-medium">
                    {credential.label}
                </span>
            </td>
            <td className="py-0 pl-3">
                <span className="text-text-secondary block truncate text-xs">
                    {credential.issuer}
                </span>
            </td>
            <td className="py-0 pl-3">
                <StatusBadge tone={tone}>{label}</StatusBadge>
            </td>
            <td className="py-0 pl-3 text-right">
                {credential.expiresInMinutes > 0 ? (
                    <AgeMark
                        minutes={credential.expiresInMinutes}
                        tone={expiryTone(credential.expiresInMinutes)}
                    />
                ) : (
                    <span className="micro-label">{UNISSUED_LABEL}</span>
                )}
            </td>
        </tr>
    );
}

CredentialRow.displayName = "CredentialRow";
