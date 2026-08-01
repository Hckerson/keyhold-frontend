import { ArrowRight } from "lucide-react";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { Spinner } from "@/components/ui/spinner";

export interface AuthSubmitProps {
    label: string;
    pendingLabel: string;
    pending: boolean;
    disabled: boolean;
}

export function AuthSubmit({
    label,
    pendingLabel,
    pending,
    disabled,
}: AuthSubmitProps) {
    return (
        <button
            type="submit"
            disabled={disabled || pending}
            aria-busy={pending || undefined}
            className="group border-accent-dark bg-accent text-text-inverse hover:bg-accent-dark focus-visible:ring-accent ease-smooth flex h-10 w-full items-center justify-between rounded-xs border px-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        >
            <span className={authLabelVariants({ tier: "marker" })}>
                {pending ? pendingLabel : label}
            </span>
            <span className="flex items-center gap-3">
                <span aria-hidden="true" className="bg-highlight h-4 w-px" />
                {pending ? (
                    <Spinner size="sm" tone="current" className="size-3" />
                ) : (
                    <ArrowRight
                        strokeWidth={1.5}
                        className="ease-smooth size-3 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                )}
            </span>
        </button>
    );
}

AuthSubmit.displayName = "AuthSubmit";
