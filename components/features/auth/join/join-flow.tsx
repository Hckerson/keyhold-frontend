"use client";

import { useState } from "react";
import { RoleChoice } from "@/components/features/auth/join/role-choice";
import { CredentialsStep } from "@/components/features/auth/join/credentials-step";
import { DevQuickLogin } from "@/components/features/dev-quick-login";
import {
    JOIN_ROLES,
    type JoinRole,
} from "@/components/features/auth/join/join-roles";

export function JoinFlow() {
    const [role, setRole] = useState<JoinRole | null>(null);
    const option = JOIN_ROLES.find((entry) => entry.value === role);

    return (
        <div className="flex flex-col gap-4">
            {option ? (
                <CredentialsStep option={option} onBack={() => setRole(null)} />
            ) : (
                <RoleChoice onSelect={setRole} />
            )}
            <DevQuickLogin />
        </div>
    );
}

JoinFlow.displayName = "JoinFlow";
