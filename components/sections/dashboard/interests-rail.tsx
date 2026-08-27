import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { statusShares, tractionShares } from "@/lib/data/interests";
import type { Interest } from "@/lib/types";

const STATUS_TITLE = "Status Mix";
const STATUS_LEDE = "Where every introduction currently sits";
const TRACTION_TITLE = "Traction";
const TRACTION_LEDE = "How far each introduction has actually moved";

export interface InterestsRailProps {
    interests: Interest[];
}

export function InterestsRail({ interests }: InterestsRailProps) {
    return (
        <div className="flex flex-col gap-3 self-start">
            <Panel
                title={STATUS_TITLE}
                description={STATUS_LEDE}
                count={interests.length}
            >
                <PanelInset>
                    <ShareList shares={statusShares(interests)} />
                </PanelInset>
            </Panel>

            <Panel title={TRACTION_TITLE} description={TRACTION_LEDE}>
                <PanelInset>
                    <ShareList shares={tractionShares(interests)} />
                </PanelInset>
            </Panel>
        </div>
    );
}

InterestsRail.displayName = "InterestsRail";
