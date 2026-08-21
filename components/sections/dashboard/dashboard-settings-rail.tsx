"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { CredentialTable } from "@/components/features/shared/credential-table";
import { SecurityControlList } from "@/components/features/shared/security-control-list";
import { ContactMethodPicker } from "@/components/features/dashboard/contact-method-picker";
import { PrivacyControlList } from "@/components/features/dashboard/privacy-control-list";
import {
    buyerSecurityControls,
    PRIVACY_CONTROL_COUNT,
    PRIVACY_CONTROLS,
    searchSignalShares,
    sharedAudienceCount,
    verifiedDocumentCount,
    type PrivacyControlId,
    type PrivacyState,
    type SearchSignal,
    type SettingsDialogKey,
} from "@/lib/data/buyer-account";
import type { AccountCredential } from "@/lib/types";
import type { ContactMethod } from "@/lib/data/dashboard-settings";

const STRENGTH_TITLE = "Search Profile";
const STRENGTH_LEDE = "Weight each signal carries on the matches you are sent";
const DOCUMENTS_TITLE = "Documents";
const DOCUMENTS_LEDE = "What is on file and when it needs renewing";
const DOCUMENTS_HEADING = "Document";
const DOCUMENTS_CAPTION =
    "Buyer documents by name, issuing body, verification state and time until renewal";
const PRIVACY_TITLE = "Privacy";
const PRIVACY_LEDE = "Who sees your details and how we reach you";
const SECURITY_TITLE = "Account Security";
const SECURITY_LEDE = "Controls that govern access to this account";
const DOWNLOAD_ACTION = "Download";

export interface DashboardSettingsRailProps {
    signals: SearchSignal[];
    strength: number;
    documents: AccountCredential[];
    privacy: PrivacyState;
    contactMethod: ContactMethod;
    twoFactorEnabled: boolean;
    onPrivacyToggle: (id: PrivacyControlId) => void;
    onContactMethodChange: (method: ContactMethod) => void;
    onSecurityAction: (id: SettingsDialogKey) => void;
    onDownloadData: () => void;
}

export function DashboardSettingsRail({
    signals,
    strength,
    documents,
    privacy,
    contactMethod,
    twoFactorEnabled,
    onPrivacyToggle,
    onContactMethodChange,
    onSecurityAction,
    onDownloadData,
}: DashboardSettingsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={STRENGTH_TITLE}
                description={STRENGTH_LEDE}
                count={`${strength}%`}
            >
                <PanelInset>
                    <ShareList shares={searchSignalShares(signals)} />
                </PanelInset>
            </Panel>

            <Panel
                title={DOCUMENTS_TITLE}
                description={DOCUMENTS_LEDE}
                count={`${verifiedDocumentCount(documents)}/${documents.length}`}
            >
                <PanelInset scroll>
                    <CredentialTable
                        credentials={documents}
                        heading={DOCUMENTS_HEADING}
                        caption={DOCUMENTS_CAPTION}
                    />
                </PanelInset>
            </Panel>

            <Panel
                title={PRIVACY_TITLE}
                description={PRIVACY_LEDE}
                count={`${sharedAudienceCount(privacy)}/${PRIVACY_CONTROL_COUNT}`}
            >
                <PanelInset>
                    <PrivacyControlList
                        controls={PRIVACY_CONTROLS}
                        state={privacy}
                        onToggle={onPrivacyToggle}
                    />
                </PanelInset>
                <PanelInset>
                    <ContactMethodPicker
                        value={contactMethod}
                        onChange={onContactMethodChange}
                    />
                </PanelInset>
            </Panel>

            <Panel
                title={SECURITY_TITLE}
                description={SECURITY_LEDE}
                action={
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={onDownloadData}
                        icon={
                            <Download
                                className="size-3"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                        }
                    >
                        {DOWNLOAD_ACTION}
                    </Button>
                }
            >
                <SecurityControlList
                    controls={buyerSecurityControls(twoFactorEnabled)}
                    onAction={onSecurityAction}
                />
            </Panel>
        </div>
    );
}

DashboardSettingsRail.displayName = "DashboardSettingsRail";
