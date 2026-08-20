import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { CredentialTable } from "@/components/features/shared/credential-table";
import { SecurityControlList } from "@/components/features/shared/security-control-list";
import {
    profileSignalShares,
    SECURITY_CONTROLS,
    verifiedCredentialCount,
    type ProfileSignal,
} from "@/lib/data/agent-account";
import type { AccountCredential } from "@/lib/types";

const STRENGTH_TITLE = "Profile Strength";
const STRENGTH_LEDE = "Weight each signal carries on your public profile";
const CREDENTIALS_TITLE = "Credentials";
const CREDENTIALS_LEDE = "What is on file and when it needs renewing";
const SECURITY_TITLE = "Account Security";
const SECURITY_LEDE = "Controls that govern access to this account";
const CREDENTIALS_HEADING = "Credential";
const CREDENTIALS_CAPTION =
    "Professional credentials by name, issuing body, verification state and time until renewal";

export interface AgentSettingsRailProps {
    signals: ProfileSignal[];
    strength: number;
    credentials: AccountCredential[];
}

export function AgentSettingsRail({
    signals,
    strength,
    credentials,
}: AgentSettingsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={STRENGTH_TITLE}
                description={STRENGTH_LEDE}
                count={`${strength}%`}
            >
                <PanelInset>
                    <ShareList shares={profileSignalShares(signals)} />
                </PanelInset>
            </Panel>

            <Panel
                title={CREDENTIALS_TITLE}
                description={CREDENTIALS_LEDE}
                count={`${verifiedCredentialCount(credentials)}/${credentials.length}`}
            >
                <PanelInset scroll>
                    <CredentialTable
                        credentials={credentials}
                        heading={CREDENTIALS_HEADING}
                        caption={CREDENTIALS_CAPTION}
                    />
                </PanelInset>
            </Panel>

            <Panel
                title={SECURITY_TITLE}
                description={SECURITY_LEDE}
                count={SECURITY_CONTROLS.length}
            >
                <SecurityControlList controls={SECURITY_CONTROLS} />
            </Panel>
        </div>
    );
}

AgentSettingsRail.displayName = "AgentSettingsRail";
