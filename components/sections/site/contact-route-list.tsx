import { useId } from "react";
import { ContactRouteRow } from "@/components/sections/site/contact-route-row";
import type { ContactRouteGroup } from "@/lib/types";

export interface ContactRouteListProps {
    group: ContactRouteGroup;
}

export function ContactRouteList({ group }: ContactRouteListProps) {
    const headingId = useId();

    return (
        <section aria-labelledby={headingId} className="flex flex-col gap-3">
            <h2
                id={headingId}
                className="text-h6 font-display text-text font-light"
            >
                {group.heading}
            </h2>

            <ul className="border-border bg-background-alt divide-border-light divide-y rounded-lg border">
                {group.routes.map((route) => (
                    <ContactRouteRow key={route.id} route={route} />
                ))}
            </ul>
        </section>
    );
}

ContactRouteList.displayName = "ContactRouteList";
