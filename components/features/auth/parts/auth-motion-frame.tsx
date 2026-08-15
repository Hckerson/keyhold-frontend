"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

export interface AuthMotionFrameProps {
    children: ReactNode;
}

export function AuthMotionFrame({ children }: AuthMotionFrameProps) {
    return (
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
    );
}

AuthMotionFrame.displayName = "AuthMotionFrame";
