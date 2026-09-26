"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { CredentialTable } from "@/components/features/shared/credential-table";
import { SecurityControlList } from "@/components/features/shared/security-control-list";
import {
    buyerSecurityControls,
    searchSignalShares,
    verifiedDocumentCount,
    type SearchSignal,
    type SettingsDialogKey,
} from "@/lib/data/buyer-account";
import type { AccountCredential } from "@/lib/types";

const STRENGTH_TITLE = "Search Profile";
const STRENGTH_LEDE = "Weight each signal carries on the matches you are sent";
const DOCUMENTS_TITLE = "Documents";
const DOCUMENTS_LEDE = "What is on file and when it needs renewing";
const DOCUMENTS_HEADING = "Document";
const DOCUMENTS_CAPTION =
    "Buyer documents by name, issuing body, verification state and time until renewal";
const SECURITY_TITLE = "Account Security";
const SECURITY_LEDE = "Controls that govern access to this account";
const DOWNLOAD_ACTION = "Download";

export interface DashboardSettingsRailProps {
    signals: SearchSignal[];
    strength: number;
    documents: AccountCredential[];
    onSecurityAction: (id: SettingsDialogKey) => void;
    onDownloadData: () => void;
    exporting: boolean;
}

export function DashboardSettingsRail({
    signals,
    strength,
    documents,
    onSecurityAction,
    onDownloadData,
    exporting,
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
                title={SECURITY_TITLE}
                description={SECURITY_LEDE}
                action={
                    <Button
                        type="button"
                        onClick={onDownloadData}
                        isLoading={exporting}
                        icon={Download}
                    >
                        {DOWNLOAD_ACTION}
                    </Button>
                }
            >
                <SecurityControlList
                    controls={buyerSecurityControls()}
                    onAction={onSecurityAction}
                />
            </Panel>
        </div>
    );
}

DashboardSettingsRail.displayName = "DashboardSettingsRail";
