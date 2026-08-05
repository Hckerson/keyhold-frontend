import type { OfferStatus } from "@/lib/types";
import { formatUsd } from "@/lib/utils";

export type TimelineTone = "neutral" | "success" | "warning" | "info" | "error";

export interface TimelineEntry {
    id: string;
    label: string;
    date: string;
    time: string;
    amount?: number;
    note?: string;
    tone: TimelineTone;
}

export interface ComparisonRow {
    key: string;
    label: string;
    yours: string;
    counter: string;
    detail: string;
}

export interface ThreadMessage {
    id: string;
    senderRole: "user" | "agent";
    author: string;
    content: string;
    timestamp: string;
}

export interface OfferDetail {
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

export const offerDetails: Record<string, OfferDetail> = {
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

export const fallbackDetail = offerDetails["1"];
