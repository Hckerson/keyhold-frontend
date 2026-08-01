import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const REGISTRATION_MARKS = [
    "-top-px -left-px border-t border-l",
    "-top-px -right-px border-t border-r",
    "-bottom-px -left-px border-b border-l",
    "-bottom-px -right-px border-b border-r",
];

export interface AuthPlaneProps {
    children: ReactNode;
}

export function AuthPlane({ children }: AuthPlaneProps) {
    return (
        <div className="border-border bg-background-alt relative rounded-xs border p-4 shadow-sm">
            {REGISTRATION_MARKS.map((mark) => (
                <span
                    key={mark}
                    aria-hidden="true"
                    className={cn(
                        "border-highlight pointer-events-none absolute size-2",
                        mark,
                    )}
                />
            ))}
            <div className="flex flex-col gap-5">{children}</div>
        </div>
    );
}

AuthPlane.displayName = "AuthPlane";
