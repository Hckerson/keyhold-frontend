import { Button } from "@/components/ui/button";
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
        <Button
            type="submit"
            size="sm"
            disabled={disabled || pending}
            aria-busy={pending || undefined}
            className="w-full"
        >
            {pending && <Spinner size="sm" tone="current" className="mr-2" />}
            {pending ? pendingLabel : label}
        </Button>
    );
}

AuthSubmit.displayName = "AuthSubmit";
