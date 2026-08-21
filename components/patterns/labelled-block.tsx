import type { ReactNode } from "react";

export interface LabelledBlockProps {
    label: string;
    children: ReactNode;
    className?: string;
}

export function LabelledBlock({
    label,
    children,
    className,
}: LabelledBlockProps) {
    return (
        <div className={className}>
            <p className="micro-label">{label}</p>
            <div className="mt-1.5">{children}</div>
        </div>
    );
}

LabelledBlock.displayName = "LabelledBlock";
