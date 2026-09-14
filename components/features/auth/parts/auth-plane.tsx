"use client";

import { Children, type ReactNode } from "react";
import { m } from "motion/react";
import {
    AUTH_PLANE_MOTION,
    AUTH_SECTION_MOTION,
} from "@/lib/config/auth-motion";
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
        <m.div
            variants={AUTH_PLANE_MOTION}
            initial="hidden"
            animate="visible"
            exit="gone"
            className="border-border-dark bg-background-alt relative rounded-xs border p-4 shadow-sm"
        >
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
            <div className="flex flex-col gap-5">
                {Children.map(children, (child) => (
                    <m.div
                        variants={AUTH_SECTION_MOTION}
                        className="empty:hidden"
                    >
                        {child}
                    </m.div>
                ))}
            </div>
        </m.div>
    );
}

AuthPlane.displayName = "AuthPlane";
