"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    JOIN_ROLES,
    type JoinRole,
    type JoinRoleOption,
} from "@/components/features/auth/join/join-roles";

/* ── one option ── */

function RoleCard({
    option,
    hero,
    onSelect,
}: {
    option: JoinRoleOption;
    hero: boolean;
    onSelect: (role: JoinRole) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
                "group ease-smooth focus-visible:ring-highlight relative isolate flex flex-col overflow-hidden rounded-xl text-left backdrop-blur-md transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none",
                hero
                    ? "bg-sidebar/55 ring-highlight/25 gap-4 p-5 shadow-lg ring-1 hover:-translate-y-0.5 hover:shadow-xl"
                    : "bg-sidebar/40 border-sidebar-border hover:bg-sidebar/60 gap-3 border p-4",
            )}
        >
            {hero && (
                <>
                    <img
                        src={option.image}
                        alt=""
                        aria-hidden="true"
                        className="ease-smooth absolute inset-0 -z-10 size-full object-cover opacity-20 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                        aria-hidden="true"
                        className="bg-highlight/25 pointer-events-none absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full blur-3xl"
                    />
                </>
            )}

            <span
                className={cn(
                    "border-sidebar-border text-highlight grid shrink-0 place-items-center rounded-full border",
                    hero ? "size-8" : "size-6",
                )}
            >
                <option.icon size={hero ? 15 : 12} strokeWidth={1.5} />
            </span>

            <div className="flex flex-col gap-2">
                <span className="text-highlight-light font-mono text-[10px] tracking-[0.16em] uppercase">
                    {option.label}
                </span>
                <span
                    className={cn(
                        "font-display text-text-inverse leading-[1.15] font-light tracking-tight",
                        hero ? "text-h5" : "text-h6",
                    )}
                >
                    {option.headline}
                </span>
                <span className="text-sidebar-text max-w-[42ch] text-xs leading-[1.8]">
                    {option.blurb}
                </span>
            </div>

            {option.points.length > 0 && (
                <ul className="flex flex-col gap-1.5">
                    {option.points.map((point) => (
                        <li
                            key={point}
                            className="text-sidebar-text flex items-center gap-2 text-[11px]"
                        >
                            <Check
                                size={12}
                                strokeWidth={1.5}
                                className="text-highlight shrink-0"
                            />
                            {point}
                        </li>
                    ))}
                </ul>
            )}

            <span className="text-text-inverse mt-auto inline-flex items-center gap-1.5 pt-1 text-xs font-medium">
                Continue
                <ArrowRight
                    size={12}
                    strokeWidth={1.5}
                    className="text-highlight ease-smooth transition-transform group-hover:translate-x-0.5"
                />
            </span>
        </button>
    );
}

export function RoleChoice({
    onSelect,
}: {
    onSelect: (role: JoinRole) => void;
}) {
    return (
        <div className="animate-in fade-in zoom-in-95 mx-auto flex w-full max-w-4xl flex-col gap-7 duration-300">
            <div className="flex flex-col gap-3">
                <p className="text-highlight-light font-mono text-[10px] tracking-[0.18em] uppercase">
                    Members&apos; entrance · Step 01 of 02
                </p>
                <h1 className="font-display text-text-inverse text-h3 max-w-[16ch] leading-[1.08] font-light tracking-tight">
                    Begin your{" "}
                    <span className="text-highlight italic">application.</span>
                </h1>
                <p className="text-sidebar-text max-w-[52ch] text-xs leading-[1.9]">
                    Tell us how you intend to use the marketplace. It shapes
                    your portal, your shortlist, and the people you speak to.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.3fr_1fr] md:items-start">
                {JOIN_ROLES.map((option, i) => (
                    <RoleCard
                        key={option.value}
                        option={option}
                        hero={i === 0}
                        onSelect={onSelect}
                    />
                ))}
            </div>

            <p className="text-sidebar-text text-xs">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-text-inverse hover:text-highlight ease-smooth font-medium underline-offset-4 transition-colors duration-200 hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}

RoleChoice.displayName = "RoleChoice";
