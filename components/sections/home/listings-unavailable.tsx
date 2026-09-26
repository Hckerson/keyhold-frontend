import Link from "next/link";
import { CloudOff } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { HOME_COPY } from "@/lib/data/home";

export function ListingsUnavailable() {
    return (
        <section className="section-pady bg-background">
            <SectionShell>
                <EmptyState
                    icon={CloudOff}
                    title={HOME_COPY.unavailable.title}
                    description={HOME_COPY.unavailable.description}
                    action={
                        <Link
                            href={PUBLIC_ROUTES.search}
                            className={buttonVariants({ size: "sm" })}
                        >
                            {HOME_COPY.unavailable.action}
                        </Link>
                    }
                />
            </SectionShell>
        </section>
    );
}

ListingsUnavailable.displayName = "ListingsUnavailable";
