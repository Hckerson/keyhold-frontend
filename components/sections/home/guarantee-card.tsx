import type { PlatformGuarantee } from "@/lib/types";

export interface GuaranteeCardProps {
    guarantee: PlatformGuarantee;
}

export function GuaranteeCard({ guarantee }: GuaranteeCardProps) {
    const Icon = guarantee.icon;

    return (
        <article className="border-border bg-background-muted flex flex-col gap-3 rounded-xl border p-4 shadow-sm">
            <span className="border-border text-accent grid size-7 place-items-center rounded-full border">
                <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="text-text text-xs font-semibold">
                {guarantee.label}
            </h3>
            <p className="text-text-secondary text-xs leading-[1.9]">
                {guarantee.statement}
            </p>
            <p className="micro-label border-border mt-auto border-t pt-3">
                {guarantee.detail}
            </p>
        </article>
    );
}

GuaranteeCard.displayName = "GuaranteeCard";
