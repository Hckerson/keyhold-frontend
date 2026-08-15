import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { CredentialTable } from "@/components/features/agent/credential-table";
import { SecurityControlList } from "@/components/features/agent/security-control-list";
import {
    AGENT_CREDENTIALS,
    PROFILE_STRENGTH,
    profileSignalShares,
    SECURITY_CONTROLS,
    verifiedCredentialCount,
} from "@/lib/data/agent-account";

const STRENGTH_TITLE = "Profile Strength";
const STRENGTH_LEDE = "Weight each signal carries on your public profile";
const CREDENTIALS_TITLE = "Credentials";
const CREDENTIALS_LEDE = "What is on file and when it needs renewing";
const SECURITY_TITLE = "Account Security";
const SECURITY_LEDE = "Controls that govern access to this account";

export function AgentSettingsRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={STRENGTH_TITLE}
                description={STRENGTH_LEDE}
                count={`${PROFILE_STRENGTH}%`}
            >
                <PanelInset>
                    <ShareList shares={profileSignalShares} />
                </PanelInset>
            </Panel>

            <Panel
                title={CREDENTIALS_TITLE}
                description={CREDENTIALS_LEDE}
                count={`${verifiedCredentialCount}/${AGENT_CREDENTIALS.length}`}
            >
                <PanelInset scroll>
                    <CredentialTable credentials={AGENT_CREDENTIALS} />
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
