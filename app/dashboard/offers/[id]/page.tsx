"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import {
    OFFER_STATUS_LABEL,
    formatUsd,
    type OfferStatus,
} from "@/components/dashboard/offer-row";
import { cn } from "@/lib/utils";

type TimelineTone = "neutral" | "success" | "warning" | "info" | "error";

interface TimelineEntry {
    id: string;
    label: string;
    date: string;
    time: string;
    amount?: number;
    note?: string;
    tone: TimelineTone;
}

interface ComparisonRow {
    key: string;
    label: string;
    yours: string;
    counter: string;
    detail: string;
}

interface ThreadMessage {
    id: string;
    senderRole: "user" | "agent";
    author: string;
    content: string;
    timestamp: string;
}

interface OfferDetail {
    id: string;
    address: string;
    listPrice: number;
    offerPrice: number;
    counterPrice?: number;
    status: OfferStatus;
    agent: string;
    timeline: TimelineEntry[];
    comparison: ComparisonRow[];
    messages: ThreadMessage[];
}

const statusTone: Record<OfferStatus, TimelineTone> = {
    submitted: "warning",
    countered: "info",
    accepted: "success",
    rejected: "error",
    withdrawn: "neutral",
};

const dotTone: Record<TimelineTone, string> = {
    neutral: "bg-border-dark",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
    error: "bg-error",
};

const microLabel =
    "text-text-muted font-mono text-[10px] font-medium tracking-wide uppercase";

const offerDetails: Record<string, OfferDetail> = {
    "1": {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        listPrice: 3200000,
        offerPrice: 3100000,
        status: "submitted",
        agent: "Sarah Chen",
        timeline: [
            {
                id: "t1",
                label: "Offer created",
                date: "Jul 22, 2026",
                time: "9:14 AM",
                amount: 3100000,
                tone: "neutral",
            },
            {
                id: "t2",
                label: "Delivered to listing agent",
                date: "Jul 22, 2026",
                time: "9:20 AM",
                note: "Acknowledged by Sarah Chen",
                tone: "info",
            },
            {
                id: "t3",
                label: "Awaiting seller response",
                date: "Jul 24, 2026",
                time: "2:05 PM",
                tone: "warning",
            },
        ],
        comparison: [
            {
                key: "amount",
                label: "Amount",
                yours: formatUsd(3100000),
                counter: "—",
                detail: "Your offer sits 3.1% below the current list price.",
            },
            {
                key: "contingencies",
                label: "Contingencies",
                yours: "Inspection, Financing",
                counter: "—",
                detail: "Inspection window of 10 days, financing window of 21 days.",
            },
            {
                key: "earnest",
                label: "Earnest money",
                yours: formatUsd(93000),
                counter: "—",
                detail: "3% of the offer amount, wired within 3 business days.",
            },
            {
                key: "move-in",
                label: "Move-in date",
                yours: "Sep 15, 2026",
                counter: "—",
                detail: "45-day close with a flexible walkthrough window.",
            },
            {
                key: "conditions",
                label: "Conditions",
                yours: "Sale of current home waived",
                counter: "—",
                detail: "No home-sale contingency; pre-approval letter attached.",
            },
        ],
        messages: [
            {
                id: "m1",
                senderRole: "agent",
                author: "Sarah Chen",
                content:
                    "Your offer is with the sellers. They are reviewing two others tonight.",
                timestamp: "Jul 24, 2:06 PM",
            },
            {
                id: "m2",
                senderRole: "user",
                author: "You",
                content: "Understood. Let me know as soon as you hear back.",
                timestamp: "Jul 24, 2:31 PM",
            },
        ],
    },
    "3": {
        id: "3",
        address: "234 Oak Street, Bel Air, CA",
        listPrice: 4500000,
        offerPrice: 4250000,
        counterPrice: 4400000,
        status: "countered",
        agent: "Michael Rodriguez",
        timeline: [
            {
                id: "t1",
                label: "Offer created",
                date: "Jul 19, 2026",
                time: "11:02 AM",
                amount: 4250000,
                tone: "neutral",
            },
            {
                id: "t2",
                label: "Seller countered",
                date: "Jul 21, 2026",
                time: "4:48 PM",
                amount: 4400000,
                note: "Seller requests a 30-day close",
                tone: "info",
            },
            {
                id: "t3",
                label: "Counter awaiting your response",
                date: "Jul 25, 2026",
                time: "8:30 AM",
                tone: "warning",
            },
        ],
        comparison: [
            {
                key: "amount",
                label: "Amount",
                yours: formatUsd(4250000),
                counter: formatUsd(4400000),
                detail: "The counter closes 60% of the gap to list price.",
            },
            {
                key: "contingencies",
                label: "Contingencies",
                yours: "Inspection, Financing, Appraisal",
                counter: "Inspection only",
                detail: "Seller asks you to waive appraisal and financing contingencies.",
            },
            {
                key: "earnest",
                label: "Earnest money",
                yours: formatUsd(127500),
                counter: formatUsd(220000),
                detail: "Counter raises the deposit from 3% to 5% of the price.",
            },
            {
                key: "move-in",
                label: "Move-in date",
                yours: "Oct 1, 2026",
                counter: "Aug 24, 2026",
                detail: "Seller wants a 30-day close instead of your 60-day timeline.",
            },
            {
                key: "conditions",
                label: "Conditions",
                yours: "Seller covers repairs up to $25,000",
                counter: "Sold as-is",
                detail: "Repair credit removed; a pre-listing inspection report is provided.",
            },
        ],
        messages: [
            {
                id: "m1",
                senderRole: "agent",
                author: "Michael Rodriguez",
                content:
                    "The sellers came back at $4.4M and want a faster close. I think $4.32M lands well.",
                timestamp: "Jul 21, 5:02 PM",
            },
            {
                id: "m2",
                senderRole: "user",
                author: "You",
                content:
                    "Can we keep the inspection contingency if I move on the price?",
                timestamp: "Jul 21, 6:10 PM",
            },
            {
                id: "m3",
                senderRole: "agent",
                author: "Michael Rodriguez",
                content:
                    "That is the trade I would push for. Send the counter.",
                timestamp: "Jul 25, 8:31 AM",
            },
        ],
    },
};

const fallbackDetail = offerDetails["1"];

const toDigits = (value: string) => value.replace(/\D/g, "");

const formatCurrencyInput = (value: string) => {
    const digits = toDigits(value);
    if (!digits) return "";
    return `$${Number(digits).toLocaleString("en-US")}`;
};

function TimelineList({ entries }: { entries: TimelineEntry[] }) {
    return (
        <ol className="space-y-3">
            {entries.map((entry, index) => (
                <li key={entry.id} className="group flex gap-3">
                    <span className="relative flex flex-col items-center">
                        <span
                            className={cn(
                                "mt-1 size-2 shrink-0 rounded-full",
                                dotTone[entry.tone],
                            )}
                        />
                        {index < entries.length - 1 && (
                            <span className="bg-border-light mt-1 w-px flex-1" />
                        )}
                    </span>
                    <div className="min-w-0 flex-1 pb-1">
                        <p className="text-text text-xs font-medium">
                            {entry.label}
                        </p>
                        <p className="text-text-muted text-xs tabular-nums opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {entry.date} · {entry.time}
                        </p>
                        {entry.amount !== undefined && (
                            <p className="text-text mt-0.5 text-xs font-medium tabular-nums">
                                {formatUsd(entry.amount)}
                            </p>
                        )}
                        {entry.note && (
                            <p className="text-text-secondary mt-0.5 text-xs">
                                {entry.note}
                            </p>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
}

function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-md border-collapse text-left">
                <thead>
                    <tr className="border-border-dark border-b">
                        <th className={cn(microLabel, "px-3 py-2")}>Term</th>
                        <th className={cn(microLabel, "px-3 py-2")}>
                            Your Offer
                        </th>
                        <th className={cn(microLabel, "px-3 py-2")}>
                            Current Counter
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => {
                        const isExpanded = expanded === row.key;
                        return (
                            <tr
                                key={row.key}
                                onClick={() =>
                                    setExpanded(isExpanded ? null : row.key)
                                }
                                className="border-border-light hover:bg-background-alt ease-smooth cursor-pointer border-b align-top transition-colors"
                            >
                                <td className="text-text-secondary px-3 py-2 text-xs">
                                    {row.label}
                                    {isExpanded && (
                                        <span className="text-text-muted mt-1 block text-xs">
                                            {row.detail}
                                        </span>
                                    )}
                                </td>
                                <td className="text-text px-3 py-2 text-xs font-medium tabular-nums">
                                    {row.yours}
                                </td>
                                <td className="text-accent px-3 py-2 text-xs font-medium tabular-nums">
                                    {row.counter}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function ThreadBubble({ message }: { message: ThreadMessage }) {
    const isUser = message.senderRole === "user";
    return (
        <li className={cn("flex", isUser && "justify-end")}>
            <div
                className={cn(
                    "flex max-w-[80%] flex-col gap-1",
                    isUser ? "items-end" : "items-start",
                )}
            >
                <div
                    className={cn(
                        "px-3 py-2 text-xs",
                        isUser
                            ? "bg-accent text-text-inverse rounded-2xl rounded-br-sm"
                            : "bg-background border-border-light text-text rounded-2xl rounded-bl-sm border",
                    )}
                >
                    {message.content}
                </div>
                <span className="text-text-muted text-xs">
                    {message.author} · {message.timestamp}
                </span>
            </div>
        </li>
    );
}

export default function OfferDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const detail = offerDetails[id] ?? fallbackDetail;

    const [status, setStatus] = useState<OfferStatus>(detail.status);
    const [offerPrice, setOfferPrice] = useState(detail.offerPrice);
    const [timeline, setTimeline] = useState<TimelineEntry[]>(detail.timeline);
    const [messages, setMessages] = useState<ThreadMessage[]>(detail.messages);
    const [counterAmount, setCounterAmount] = useState("");
    const [counterNote, setCounterNote] = useState("");
    const [draft, setDraft] = useState("");
    const [confirming, setConfirming] = useState<
        "counter" | "accept" | "withdraw" | null
    >(null);

    const closed = status === "accepted" || status === "withdrawn";
    const counterValue = Number(toDigits(counterAmount));

    const addTimelineEntry = (entry: Omit<TimelineEntry, "id">) => {
        setTimeline((prev) => [
            ...prev,
            { ...entry, id: `t${prev.length + 1}-${Date.now()}` },
        ]);
    };

    const confirmCounter = () => {
        addTimelineEntry({
            label: "You countered",
            date: "Jul 26, 2026",
            time: "Just now",
            amount: counterValue,
            note: counterNote || undefined,
            tone: "info",
        });
        if (counterNote) {
            setMessages((prev) => [
                ...prev,
                {
                    id: `m${prev.length + 1}`,
                    senderRole: "user",
                    author: "You",
                    content: counterNote,
                    timestamp: "Just now",
                },
            ]);
        }
        setOfferPrice(counterValue);
        setStatus("submitted");
        setCounterAmount("");
        setCounterNote("");
        setConfirming(null);
    };

    const confirmAccept = () => {
        addTimelineEntry({
            label: "You accepted the counter",
            date: "Jul 26, 2026",
            time: "Just now",
            amount: detail.counterPrice,
            tone: "success",
        });
        if (detail.counterPrice) setOfferPrice(detail.counterPrice);
        setStatus("accepted");
        setConfirming(null);
    };

    const confirmWithdraw = () => {
        addTimelineEntry({
            label: "You withdrew the offer",
            date: "Jul 26, 2026",
            time: "Just now",
            tone: "error",
        });
        setStatus("withdrawn");
        setConfirming(null);
    };

    const sendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        const content = draft.trim();
        if (!content) return;
        setMessages((prev) => [
            ...prev,
            {
                id: `m${prev.length + 1}`,
                senderRole: "user",
                author: "You",
                content,
                timestamp: "Just now",
            },
        ]);
        setDraft("");
    };

    return (
        <div className="space-y-3">
            <Link
                href="/dashboard/offers"
                className="text-text-secondary hover:text-accent ease-smooth inline-flex items-center gap-1.5 text-xs transition-colors"
            >
                <ArrowLeft size={12} strokeWidth={1.5} />
                Back to offers
            </Link>

            <PageHeader
                title={detail.address}
                description={`Listed at ${formatUsd(detail.listPrice)} · Agent ${detail.agent}`}
                action={
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge tone={statusTone[status]}>
                            {OFFER_STATUS_LABEL[status]}
                        </StatusBadge>
                        <Button
                            variant="primary"
                            size="sm"
                            disabled={
                                closed || detail.counterPrice === undefined
                            }
                            onClick={() => setConfirming("accept")}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={closed || counterValue <= 0}
                            onClick={() => setConfirming("counter")}
                        >
                            Counter
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            disabled={closed}
                            onClick={() => setConfirming("withdraw")}
                        >
                            Withdraw
                        </Button>
                    </div>
                }
            />

            <div className="grid gap-3 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                    <Panel
                        title="Offer Comparison"
                        description="Click any term to expand the detail"
                    >
                        <ComparisonTable rows={detail.comparison} />
                    </Panel>

                    <Panel
                        title="Counter Offer"
                        description="Respond with new terms"
                    >
                        <div className="space-y-3">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="border-border-light bg-background rounded-lg border p-3">
                                    <p className={microLabel}>
                                        Your Current Offer
                                    </p>
                                    <p className="text-text mt-0.5 text-xs font-medium tabular-nums">
                                        {formatUsd(offerPrice)}
                                    </p>
                                </div>
                                <div className="border-border-light bg-background rounded-lg border p-3">
                                    <p className={microLabel}>
                                        Seller&rsquo;s Counter
                                    </p>
                                    <p className="font-display text-accent mt-0.5 text-lg font-light tabular-nums">
                                        {detail.counterPrice === undefined
                                            ? "—"
                                            : formatUsd(detail.counterPrice)}
                                    </p>
                                </div>
                            </div>

                            <Input
                                id="counter-amount"
                                label="Your new counter"
                                inputMode="numeric"
                                placeholder="$0"
                                value={counterAmount}
                                disabled={closed}
                                onChange={(event) =>
                                    setCounterAmount(
                                        formatCurrencyInput(event.target.value),
                                    )
                                }
                            />

                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="counter-note"
                                    className="text-text text-xs font-medium"
                                >
                                    Message to seller
                                </label>
                                <Textarea
                                    id="counter-note"
                                    rows={3}
                                    placeholder="Explain the terms behind your counter…"
                                    value={counterNote}
                                    disabled={closed}
                                    onChange={(event) =>
                                        setCounterNote(event.target.value)
                                    }
                                />
                            </div>

                            {closed && (
                                <Callout
                                    variant="info"
                                    title={`This offer is ${OFFER_STATUS_LABEL[status].toLowerCase()}`}
                                    description="No further counters can be submitted."
                                />
                            )}

                            <Button
                                variant="primary"
                                size="sm"
                                disabled={closed || counterValue <= 0}
                                onClick={() => setConfirming("counter")}
                            >
                                Submit Counter
                            </Button>
                        </div>
                    </Panel>

                    <Panel title="Messages" count={messages.length}>
                        <div className="space-y-3">
                            <ul className="max-h-80 space-y-3 overflow-y-auto">
                                {messages.map((message) => (
                                    <ThreadBubble
                                        key={message.id}
                                        message={message}
                                    />
                                ))}
                            </ul>
                            <form
                                onSubmit={sendMessage}
                                className="border-border-light flex items-center gap-2 border-t pt-3"
                            >
                                <Input
                                    aria-label="Message to agent"
                                    placeholder="Message your agent…"
                                    value={draft}
                                    onChange={(event) =>
                                        setDraft(event.target.value)
                                    }
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    type="button"
                                    aria-label="Attach a file"
                                    className="shrink-0"
                                >
                                    <Paperclip size={12} strokeWidth={1.5} />
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    type="submit"
                                    aria-label="Send message"
                                    className="shrink-0"
                                >
                                    <Send size={12} strokeWidth={1.5} />
                                </Button>
                            </form>
                        </div>
                    </Panel>
                </div>

                <Panel
                    title="Offer Timeline"
                    count={timeline.length}
                    className="lg:col-span-1"
                >
                    <TimelineList entries={timeline} />
                </Panel>
            </div>

            <Modal
                open={confirming !== null}
                onOpenChange={(open) => {
                    if (!open) setConfirming(null);
                }}
            >
                <ModalHeader>
                    <ModalTitle>
                        {confirming === "accept" && "Accept counter offer"}
                        {confirming === "counter" && "Submit counter offer"}
                        {confirming === "withdraw" && "Withdraw offer"}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p className="text-text-secondary text-xs">
                        {confirming === "accept" &&
                            detail.counterPrice !== undefined &&
                            `You are accepting the seller's counter of ${formatUsd(detail.counterPrice)} for ${detail.address}.`}
                        {confirming === "counter" &&
                            `You are countering at ${formatUsd(counterValue)} for ${detail.address}.`}
                        {confirming === "withdraw" &&
                            `Withdrawing removes your offer on ${detail.address}. This cannot be undone.`}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setConfirming(null)}
                    >
                        Cancel
                    </Button>
                    {confirming === "accept" && (
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={confirmAccept}
                        >
                            Accept Counter
                        </Button>
                    )}
                    {confirming === "counter" && (
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={confirmCounter}
                        >
                            Send Counter
                        </Button>
                    )}
                    {confirming === "withdraw" && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={confirmWithdraw}
                        >
                            Withdraw Offer
                        </Button>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
}
