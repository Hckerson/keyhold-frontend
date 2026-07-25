"use client";

import { ArrowLeft, Check } from "lucide-react";
import type { JoinRoleOption } from "@/components/features/auth/join/join-roles";
import {
    ROLE_WORD,
    SIGNUP_COPY,
    dossierSpecs,
} from "@/components/features/auth/join/signup-fields";

/* ── the always-present promise plane (survives an empty points list) ── */

function DossierSpecs({ option }: { option: JoinRoleOption }) {
    return (
        <dl className="bg-sidebar-active/60 hidden rounded-md p-2 md:flex md:flex-col md:gap-1.5">
            {dossierSpecs(option).map((spec) => (
                <div
                    key={spec.key}
                    className="flex items-baseline justify-between gap-2"
                >
                    <dt className="text-sidebar-text font-mono text-[10px] tracking-[0.14em] uppercase">
                        {spec.key}
                    </dt>
                    <dd className="text-text-inverse min-w-0 truncate text-xs">
                        {spec.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

DossierSpecs.displayName = "DossierSpecs";

/* ── return to step 01 ── */

function BackControl({
    onBack,
    disabled,
}: {
    onBack: () => void;
    disabled: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onBack}
            disabled={disabled}
            className="border-sidebar-border text-sidebar-text hover:text-text-inverse hover:border-highlight/40 focus-visible:ring-highlight ease-smooth ml-auto inline-flex shrink-0 items-center gap-1.5 self-center rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50 md:ml-0 md:self-start"
        >
            <ArrowLeft size={12} strokeWidth={1.5} aria-hidden="true" />
            {SIGNUP_COPY.backLabel}
            <span
                aria-hidden="true"
                className="border-sidebar-border hidden rounded-xs border px-1 py-px text-[10px] md:inline"
            >
                {SIGNUP_COPY.escHint}
            </span>
        </button>
    );
}

BackControl.displayName = "BackControl";

/* ── shell ── */

export interface RoleDossierProps {
    option: JoinRoleOption;
    onBack: () => void;
    disabled: boolean;
}

export function RoleDossier({ option, onBack, disabled }: RoleDossierProps) {
    return (
        <div className="bg-sidebar/55 ring-highlight/25 animate-in fade-in slide-in-from-left-2 relative isolate flex items-center gap-3 overflow-hidden rounded-xl p-4 shadow-lg ring-1 backdrop-blur-md duration-300 md:flex-col md:items-stretch md:gap-4">
            <img
                src={option.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 -z-10 size-full object-cover opacity-20"
            />
            <div
                aria-hidden="true"
                className="bg-highlight/25 pointer-events-none absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full blur-3xl"
            />

            <span className="border-sidebar-border text-highlight grid size-6 shrink-0 place-items-center rounded-full border">
                <option.icon size={12} strokeWidth={1.5} aria-hidden="true" />
            </span>

            <div className="flex min-w-0 flex-col gap-2">
                <p className="text-highlight-light font-mono text-[10px] tracking-[0.16em] uppercase">
                    {SIGNUP_COPY.eyebrow}
                </p>
                <h1 className="font-display text-text-inverse text-h5 md:text-h4 max-w-[14ch] leading-[1.1] font-light tracking-tight">
                    {SIGNUP_COPY.headLead}{" "}
                    <span className="text-highlight italic">
                        {ROLE_WORD[option.value]}
                    </span>{" "}
                    {SIGNUP_COPY.headTail}
                </h1>
            </div>

            <p className="text-sidebar-text font-display hidden max-w-[38ch] text-xs italic md:block">
                {option.headline}
            </p>

            <p className="text-sidebar-text hidden max-w-[38ch] text-xs leading-[1.8] md:block">
                {option.blurb}
            </p>

            {option.points.length > 0 && (
                <ul className="hidden flex-col gap-1.5 md:flex">
                    {option.points.map((point) => (
                        <li
                            key={point}
                            className="text-sidebar-text flex items-center gap-2 text-xs"
                        >
                            <Check
                                size={12}
                                strokeWidth={1.5}
                                aria-hidden="true"
                                className="text-highlight shrink-0"
                            />
                            {point}
                        </li>
                    ))}
                </ul>
            )}

            <DossierSpecs option={option} />

            <BackControl onBack={onBack} disabled={disabled} />
        </div>
    );
}

RoleDossier.displayName = "RoleDossier";
