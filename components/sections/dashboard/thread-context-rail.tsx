import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { ThreadAgentCard } from "@/components/features/messaging/thread-agent-card";
import { ThreadPropertyCard } from "@/components/features/messaging/thread-property-card";
import { DocumentList } from "@/components/features/messaging/document-list";
import { EmptyState } from "@/components/ui/empty-state";
import { FileX } from "lucide-react";
import { statusShares } from "@/lib/data/messages-stats";
import type { Conversation } from "@/lib/types";
import type { ThreadDocument } from "@/lib/types/message";

const PROPERTY_TITLE = "Under Discussion";
const PROPERTY_LEDE = "The listing this thread is about";
const AGENT_TITLE = "Your Contact";
const AGENT_LEDE = "Who you are speaking to and how fast they answer";
const DOCUMENTS_TITLE = "Shared Documents";
const DOCUMENTS_LEDE = "Every file exchanged in this thread";
const DOCUMENTS_EMPTY = "Nothing shared yet";
const DOCUMENTS_EMPTY_LEDE =
    "Attach a file to the conversation and it appears here.";
const MIX_TITLE = "Thread Mix";
const MIX_LEDE = "Where every conversation stands";

export interface ThreadContextRailProps {
    conversation?: Conversation;
    conversations: Conversation[];
    documents: ThreadDocument[];
    replyMinutes: number | null;
}

export function ThreadContextRail({
    conversation,
    conversations,
    documents,
    replyMinutes,
}: ThreadContextRailProps) {
    return (
        <div className="scroll-y flex flex-col gap-3">
            {conversation && (
                <>
                    <Panel title={PROPERTY_TITLE} description={PROPERTY_LEDE}>
                        <PanelInset>
                            <ThreadPropertyCard conversation={conversation} />
                        </PanelInset>
                    </Panel>

                    <Panel title={AGENT_TITLE} description={AGENT_LEDE}>
                        <PanelInset>
                            <ThreadAgentCard
                                conversation={conversation}
                                replyMinutes={replyMinutes}
                            />
                        </PanelInset>
                    </Panel>

                    <Panel
                        title={DOCUMENTS_TITLE}
                        description={DOCUMENTS_LEDE}
                        count={documents.length}
                    >
                        {documents.length > 0 ? (
                            <PanelInset>
                                <DocumentList documents={documents} />
                            </PanelInset>
                        ) : (
                            <EmptyState
                                icon={FileX}
                                title={DOCUMENTS_EMPTY}
                                description={DOCUMENTS_EMPTY_LEDE}
                            />
                        )}
                    </Panel>
                </>
            )}

            <Panel
                title={MIX_TITLE}
                description={MIX_LEDE}
                count={conversations.length}
            >
                <PanelInset>
                    <ShareList shares={statusShares(conversations)} />
                </PanelInset>
            </Panel>
        </div>
    );
}

ThreadContextRail.displayName = "ThreadContextRail";
