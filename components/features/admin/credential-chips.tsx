import { Check, Minus, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const TITLE = "Credentials";

const CREDENTIAL_STATES = {
    connected: {
        label: "Connected",
        icon: Check,
        className:
            "border-border-light text-text-secondary [&>svg]:text-success",
    },
    missing: {
        label: "Missing keys",
        icon: TriangleAlert,
        className: "border-error/30 bg-error-light text-error",
    },
    optional: {
        label: "Not set up",
        icon: Minus,
        className: "border-border-light text-text-muted border-dashed",
    },
};

const stateOf = ({ configured, required }: IntegrationStatus) =>
    CREDENTIAL_STATES[
        configured ? "connected" : required ? "missing" : "optional"
    ];

export interface CredentialChipsProps {
    integrations: IntegrationStatus[];
    summary: string;
}

export function CredentialChips({
    integrations,
    summary,
}: CredentialChipsProps) {
    return (
        <section aria-label={TITLE} className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
                <span className="micro-label shrink-0">{TITLE}</span>
                <span className="text-text-secondary truncate text-xs">
                    {summary}
                </span>
            </p>
            <ul className="flex flex-wrap gap-1.5">
                {integrations.map((integration) => {
                    const state = stateOf(integration);
                    const Icon = state.icon;

                    return (
                        <li
                            key={integration.id}
                            title={integration.capability}
                            className={cn(
                                "inline-flex h-6 items-center gap-1 rounded-md border px-2 text-xs font-medium",
                                state.className,
                            )}
                        >
                            <Icon
                                aria-hidden="true"
                                strokeWidth={1.5}
                                className="size-3"
                            />
                            {integration.label}
                            <span className="sr-only">{state.label}</span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

CredentialChips.displayName = "CredentialChips";
