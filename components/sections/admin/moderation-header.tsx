import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const MODERATION_TITLE = "Listing Moderation";
const MODERATION_LEDE =
    "What is waiting on a decision, what the compliance scan caught, and who keeps sending it";
const QUEUE_ACTION = "Verifications";

export function ModerationHeader() {
    return (
        <PortalHeader
            title={MODERATION_TITLE}
            lede={MODERATION_LEDE}
            action={
                <Link
                    href="/admin/verifications"
                    className={buttonVariants({
                        emphasis: "solid",
                        tone: "accent",
                        size: "sm",
                    })}
                >
                    {QUEUE_ACTION}
                </Link>
            }
        />
    );
}

ModerationHeader.displayName = "ModerationHeader";
