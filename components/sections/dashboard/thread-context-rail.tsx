import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { ThreadAgentCard } from "@/components/features/messaging/thread-agent-card";
import { ThreadFileList } from "@/components/features/messaging/thread-file-list";
import { ThreadPropertyCard } from "@/components/features/messaging/thread-property-card";
import { statusShares } from "@/lib/data/messages";
import type { Conversation } from "@/lib/types";

const PROPERTY_TITLE = "Under Discussion";
const PROPERTY_LEDE = "The listing this thread is about";
const AGENT_TITLE = "Your Contact";
const AGENT_LEDE = "Who you are speaking to and how fast they answer";
const FILES_TITLE = "Shared Files";
const FILES_LEDE = "Everything exchanged in this thread";
const MIX_TITLE = "Thread Mix";
const MIX_LEDE = "Where every conversation stands";

export interface ThreadContextRailProps {
    conversation?: Conversation;
    conversations: Conversation[];
    files: string[];
}

export function ThreadContextRail({
    conversation,
    conversations,
    files,
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
                            <ThreadAgentCard conversation={conversation} />
                        </PanelInset>
                    </Panel>

                    <Panel
                        title={FILES_TITLE}
                        description={FILES_LEDE}
                        count={files.length}
                    >
                        <PanelInset>
                            <ThreadFileList files={files} />
                        </PanelInset>
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
