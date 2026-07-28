"use client";

import { useMemo, useState } from "react";
import {
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Mail,
    Phone,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Callout } from "@/components/ui/callout";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { Image } from "@/components/ui/image";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import type { BadgeTone } from "@/components/dashboard/contact-row";
import { cn } from "@/lib/utils";

type ListingStatus = "pending" | "flagged" | "approved" | "rejected";
type CheckState = "pass" | "warn" | "fail";
type FilterKey = "all" | ListingStatus;
type DecisionMode = "reject" | "changes";

interface ComplianceCheck {
    label: string;
    state: CheckState;
}

interface ListingAgent {
    name: string;
    email: string;
    phone: string;
}

interface Listing {
    id: string;
    address: string;
    agent: ListingAgent;
    price: number;
    status: ListingStatus;
    submittedDate: string;
    description: string;
    images: string[];
    compliance: ComplianceCheck[];
    reason?: string;
    note?: string;
    changesRequested?: boolean;
}

interface Decision {
    mode: DecisionMode;
    ids: string[];
}

const INITIAL_LISTINGS: Listing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        agent: {
            name: "Sarah Chen",
            email: "sarah@luxuryrealestate.com",
            phone: "(310) 555-0142",
        },
        price: 3200000,
        status: "approved",
        submittedDate: "2024-07-10",
        description:
            "Contemporary six-bedroom estate on a gated half-acre lot. Floor-to-ceiling glass opens to a level lawn, 60-foot pool and outdoor kitchen. Chef's kitchen with dual islands, primary suite with dual baths and a 900-bottle wine room.",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "pass" },
            { label: "Description accuracy", state: "pass" },
            { label: "License on file", state: "pass" },
            { label: "Fair housing language", state: "pass" },
        ],
    },
    {
        id: "2",
        address: "789 Sunset Blvd, West Hollywood, CA",
        agent: {
            name: "Michael Rodriguez",
            email: "michael@sunsetproperties.com",
            phone: "(323) 555-0178",
        },
        price: 2950000,
        status: "flagged",
        submittedDate: "2024-07-12",
        reason: "Automated scan detected an unlicensed stock photo in position 2 and unverifiable square footage in the description.",
        description:
            "Rare Sunset Strip penthouse with 180-degree city views. Over 4,800 square feet of entertaining space, private elevator access and a rooftop deck. Building amenities include valet, concierge and a residents' screening room.",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "fail" },
            { label: "Description accuracy", state: "warn" },
            { label: "License on file", state: "pass" },
            { label: "Fair housing language", state: "pass" },
        ],
    },
    {
        id: "3",
        address: "234 Oak Street, Bel Air, CA",
        agent: {
            name: "Jennifer Martinez",
            email: "jennifer@belairgroup.com",
            phone: "(310) 555-0190",
        },
        price: 4500000,
        status: "pending",
        submittedDate: "2024-07-13",
        description:
            "Mediterranean villa behind private gates with mature olive trees and a motor court. Seven bedrooms, a two-story library, screening room and a guest house. Fully renovated in 2022 with new systems throughout.",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "pass" },
            { label: "Description accuracy", state: "pass" },
            { label: "License on file", state: "warn" },
            { label: "Fair housing language", state: "pass" },
        ],
    },
    {
        id: "4",
        address: "1120 Ocean Front Walk, Malibu, CA",
        agent: {
            name: "David Williams",
            email: "david@coastlineestates.com",
            phone: "(424) 555-0113",
        },
        price: 7850000,
        status: "pending",
        submittedDate: "2024-07-14",
        description:
            "Beachfront modern on 60 feet of private sand. Walls of glass frame the water from every principal room. Four bedrooms, a spa-level primary bath and a rooftop lounge with a fire pit.",
        images: [
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "pass" },
            { label: "Description accuracy", state: "warn" },
            { label: "License on file", state: "pass" },
            { label: "Fair housing language", state: "warn" },
        ],
    },
    {
        id: "5",
        address: "88 Rodeo Drive, Beverly Hills, CA",
        agent: {
            name: "Marcus Sterling",
            email: "marcus@sterlingluxe.com",
            phone: "(310) 555-0166",
        },
        price: 5400000,
        status: "rejected",
        submittedDate: "2024-07-02",
        note: "Interior photographs belong to a different property and the listing repeats claims that cannot be verified against county records.",
        description:
            "Trophy address steps from the flagship boutiques. Five bedrooms across three levels, private motor court and a subterranean garage for six cars.",
        images: [
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=320&h=200&fit=crop",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=320&h=200&fit=crop",
        ],
        compliance: [
            { label: "Photo quality", state: "fail" },
            { label: "Description accuracy", state: "fail" },
            { label: "License on file", state: "pass" },
            { label: "Fair housing language", state: "pass" },
        ],
    },
];

const statusMeta: Record<ListingStatus, { tone: BadgeTone; label: string }> = {
    pending: { tone: "warning", label: "Pending" },
    flagged: { tone: "error", label: "Flagged" },
    approved: { tone: "success", label: "Approved" },
    rejected: { tone: "neutral", label: "Rejected" },
};

const checkMeta: Record<CheckState, { icon: LucideIcon; cls: string }> = {
    pass: { icon: CheckCircle2, cls: "text-success" },
    warn: { icon: AlertTriangle, cls: "text-warning" },
    fail: { icon: XCircle, cls: "text-error" },
};

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "flagged", label: "Flagged" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
];

const DECISION_COPY: Record<
    DecisionMode,
    { title: string; label: string; placeholder: string; submit: string }
> = {
    reject: {
        title: "Reject listing",
        label: "Reason for rejection",
        placeholder:
            "Explain what fails review. This reason is stored with the listing and sent to the agent.",
        submit: "Reject listing",
    },
    changes: {
        title: "Request changes",
        label: "Feedback for the agent",
        placeholder:
            "Describe exactly what the agent must change before this listing can be approved.",
        submit: "Send feedback",
    },
};

const microLabel =
    "text-text-muted font-mono text-[10px] uppercase tracking-wide";

const toMillions = (value: number) => `$${(value / 1_000_000).toFixed(2)}M`;

function ComplianceList({ checks }: { checks: ComplianceCheck[] }) {
    return (
        <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {checks.map((check) => {
                const meta = checkMeta[check.state];
                const Icon = meta.icon;
                return (
                    <li
                        key={check.label}
                        className={cn(
                            "flex items-center gap-1 text-xs",
                            meta.cls,
                        )}
                    >
                        <Icon
                            size={12}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="shrink-0"
                        />
                        {check.label}
                    </li>
                );
            })}
        </ul>
    );
}

function AgentContact({ agent }: { agent: ListingAgent }) {
    return (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="text-text font-medium">{agent.name}</span>
            <a
                href={`mailto:${agent.email}`}
                className="text-text-secondary hover:text-accent ease-smooth flex items-center gap-1 transition-colors"
            >
                <Mail
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0"
                />
                {agent.email}
            </a>
            <a
                href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                className="text-text-secondary hover:text-accent ease-smooth flex items-center gap-1 transition-colors"
            >
                <Phone
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0"
                />
                {agent.phone}
            </a>
        </div>
    );
}

export default function AdminModerationPage() {
    const [items, setItems] = useState<Listing[]>(INITIAL_LISTINGS);
    const [filter, setFilter] = useState<FilterKey>("all");
    const [selected, setSelected] = useState<string[]>([]);
    const [decision, setDecision] = useState<Decision | null>(null);
    const [note, setNote] = useState("");

    const counts = useMemo(() => {
        const base: Record<FilterKey, number> = {
            all: items.length,
            pending: 0,
            flagged: 0,
            approved: 0,
            rejected: 0,
        };
        for (const item of items) base[item.status] += 1;
        return base;
    }, [items]);

    const visible = useMemo(
        () =>
            filter === "all"
                ? items
                : items.filter((item) => item.status === filter),
        [items, filter],
    );

    const allVisibleSelected =
        visible.length > 0 &&
        visible.every((item) => selected.includes(item.id));

    const changeFilter = (key: FilterKey) => {
        setFilter(key);
        setSelected([]);
    };

    const toggleOne = (id: string) => {
        setSelected((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    const toggleAll = () => {
        setSelected(allVisibleSelected ? [] : visible.map((item) => item.id));
    };

    const approve = (ids: string[]) => {
        setItems((current) =>
            current.map((item) =>
                ids.includes(item.id)
                    ? {
                          ...item,
                          status: "approved",
                          reason: undefined,
                          note: undefined,
                          changesRequested: false,
                      }
                    : item,
            ),
        );
        setSelected((current) => current.filter((id) => !ids.includes(id)));
    };

    const openDecision = (mode: DecisionMode, ids: string[]) => {
        setDecision({ mode, ids });
        setNote("");
    };

    const closeDecision = () => {
        setDecision(null);
        setNote("");
    };

    const submitDecision = () => {
        const trimmed = note.trim();
        if (!decision || !trimmed) return;
        const { mode, ids } = decision;
        setItems((current) =>
            current.map((item) =>
                ids.includes(item.id)
                    ? mode === "reject"
                        ? {
                              ...item,
                              status: "rejected",
                              note: trimmed,
                              changesRequested: false,
                          }
                        : {
                              ...item,
                              status: "pending",
                              note: trimmed,
                              changesRequested: true,
                          }
                    : item,
            ),
        );
        setSelected((current) => current.filter((id) => !ids.includes(id)));
        closeDecision();
    };

    const copy = decision ? DECISION_COPY[decision.mode] : null;

    return (
        <div className="space-y-3">
            <PageHeader
                title="Listings Moderation"
                description={`${counts.pending} pending · ${counts.flagged} flagged · ${counts.approved} approved · ${counts.rejected} rejected`}
                action={
                    <Button variant="secondary" size="sm">
                        Export
                    </Button>
                }
            />

            <div className="flex flex-wrap items-center gap-2">
                {FILTERS.map((item) => (
                    <Button
                        key={item.key}
                        variant={filter === item.key ? "primary" : "secondary"}
                        size="sm"
                        aria-pressed={filter === item.key}
                        onClick={() => changeFilter(item.key)}
                    >
                        {item.label}
                        <span className="ml-1.5 tabular-nums opacity-70">
                            {counts[item.key]}
                        </span>
                    </Button>
                ))}
            </div>

            {visible.length > 0 && (
                <div className="bg-background-muted border-border-light flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3">
                    <Checkbox
                        id="select-all-listings"
                        label={
                            selected.length > 0
                                ? `${selected.length} selected`
                                : "Select all"
                        }
                        checked={allVisibleSelected}
                        onChange={toggleAll}
                    />

                    {selected.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => approve(selected)}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                    openDecision("changes", selected)
                                }
                            >
                                Request Changes
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => openDecision("reject", selected)}
                            >
                                Reject
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelected([])}
                            >
                                Clear
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {visible.length === 0 ? (
                <EmptyState
                    icon={ShieldCheck}
                    title="Queue is clear"
                    description="No listings match this filter right now."
                />
            ) : (
                <div className="space-y-3">
                    {visible.map((listing) => {
                        const meta = statusMeta[listing.status];
                        return (
                            <article
                                key={listing.id}
                                className="bg-background-muted border-border-light hover:border-border ease-smooth rounded-xl border p-3 shadow-sm transition-all duration-300 hover:shadow-md"
                            >
                                <div className="flex items-start gap-3">
                                    <Checkbox
                                        aria-label={`Select ${listing.address}`}
                                        checked={selected.includes(listing.id)}
                                        onChange={() => toggleOne(listing.id)}
                                    />

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="text-text truncate text-sm font-medium">
                                                {listing.address}
                                            </h3>
                                            <StatusBadge tone={meta.tone}>
                                                {meta.label}
                                            </StatusBadge>
                                        </div>

                                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                                            <span className="text-text font-medium tabular-nums">
                                                {toMillions(listing.price)}
                                            </span>
                                            <span className="text-text-muted">
                                                ·
                                            </span>
                                            <span className="text-text-muted">
                                                Submitted{" "}
                                                {listing.submittedDate}
                                            </span>
                                        </div>

                                        <AgentContact agent={listing.agent} />

                                        <div className="mt-3 grid gap-3 sm:grid-cols-[13rem_1fr]">
                                            <div>
                                                <p className={microLabel}>
                                                    Photos ·{" "}
                                                    {listing.images.length}
                                                </p>
                                                <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                                                    {listing.images.map(
                                                        (src, index) => (
                                                            <Image
                                                                key={src}
                                                                src={src}
                                                                alt={`${listing.address} photo ${index + 1}`}
                                                                loading="lazy"
                                                                className="border-border-light border"
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            <div className="min-w-0">
                                                <p className={microLabel}>
                                                    Description
                                                </p>
                                                <p className="text-text-secondary mt-1.5 text-xs leading-relaxed">
                                                    {listing.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <p className={microLabel}>
                                                Compliance
                                            </p>
                                            <ComplianceList
                                                checks={listing.compliance}
                                            />
                                        </div>

                                        {listing.reason && (
                                            <Callout
                                                variant="error"
                                                title="Flagged reason"
                                                description={listing.reason}
                                                className="mt-3"
                                            />
                                        )}

                                        {listing.note && (
                                            <Callout
                                                variant={
                                                    listing.changesRequested
                                                        ? "warning"
                                                        : "error"
                                                }
                                                title={
                                                    listing.changesRequested
                                                        ? "Changes requested"
                                                        : "Rejection reason"
                                                }
                                                description={listing.note}
                                                className="mt-3"
                                            />
                                        )}

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {listing.status !== "approved" && (
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() =>
                                                        approve([listing.id])
                                                    }
                                                >
                                                    Approve
                                                </Button>
                                            )}
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    openDecision("changes", [
                                                        listing.id,
                                                    ])
                                                }
                                            >
                                                Request Changes
                                            </Button>
                                            {listing.status !== "rejected" && (
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        openDecision("reject", [
                                                            listing.id,
                                                        ])
                                                    }
                                                >
                                                    Reject
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

            <Modal
                open={decision !== null}
                onOpenChange={(open) => {
                    if (!open) closeDecision();
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="moderation-decision-title"
            >
                {copy && decision && (
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle id="moderation-decision-title">
                                {copy.title}
                            </ModalTitle>
                            <p className="text-text-secondary mt-1 text-xs tabular-nums">
                                {decision.ids.length} listing
                                {decision.ids.length === 1 ? "" : "s"} selected
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <label
                                htmlFor="moderation-note"
                                className={microLabel}
                            >
                                {copy.label}
                            </label>
                            <Textarea
                                id="moderation-note"
                                rows={4}
                                value={note}
                                onChange={(event) =>
                                    setNote(event.target.value)
                                }
                                placeholder={copy.placeholder}
                                className="mt-1.5"
                            />
                            <p className="text-text-muted mt-1.5 text-xs">
                                Required. The agent receives this message with
                                the decision.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={closeDecision}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={
                                    decision.mode === "reject"
                                        ? "danger"
                                        : "primary"
                                }
                                size="sm"
                                disabled={note.trim().length === 0}
                                onClick={submitDecision}
                            >
                                {copy.submit}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                )}
            </Modal>
        </div>
    );
}
