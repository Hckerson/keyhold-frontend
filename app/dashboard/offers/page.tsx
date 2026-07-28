"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { OfferRow } from "@/components/features/dashboard/offer-row";
import type { Offer, OfferStatus } from "@/lib/types";
type OfferFilter = "all" | OfferStatus;

const filters: { value: OfferFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "submitted", label: "Submitted" },
    { value: "countered", label: "Countered" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
];

const initialOffers: Offer[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        offerPrice: 3100000,
        listPrice: 3200000,
        status: "submitted",
        lastActivity: "2 days ago",
    },
    {
        id: "2",
        address: "789 Sunset Blvd, West Hollywood, CA",
        offerPrice: 2950000,
        listPrice: 2950000,
        status: "accepted",
        lastActivity: "5 days ago",
    },
    {
        id: "3",
        address: "234 Oak Street, Bel Air, CA",
        offerPrice: 4250000,
        listPrice: 4500000,
        counterPrice: 4400000,
        status: "countered",
        lastActivity: "yesterday",
    },
    {
        id: "4",
        address: "88 Marine Terrace, Santa Monica, CA",
        offerPrice: 2400000,
        listPrice: 2750000,
        status: "rejected",
        lastActivity: "3 weeks ago",
    },
];

export default function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>(initialOffers);
    const [filter, setFilter] = useState<OfferFilter>("all");

    const countFor = (value: OfferFilter) =>
        value === "all"
            ? offers.length
            : offers.filter((offer) => offer.status === value).length;

    const visible =
        filter === "all"
            ? offers
            : offers.filter((offer) => offer.status === filter);

    const active = offers.filter(
        (offer) => offer.status === "submitted" || offer.status === "countered",
    ).length;

    const withdraw = (id: string) => {
        setOffers((prev) =>
            prev.map((offer) =>
                offer.id === id ? { ...offer, status: "withdrawn" } : offer,
            ),
        );
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="Your Offers"
                description={`${active} active offer${active !== 1 ? "s" : ""}`}
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Make New Offer
                        </Button>
                    </Link>
                }
            />

            <div
                role="group"
                aria-label="Filter offers by status"
                className="bg-background-muted border-border-light flex flex-wrap gap-2 rounded-xl border p-3"
            >
                {filters.map((item) => (
                    <Button
                        key={item.value}
                        variant={filter === item.value ? "primary" : "ghost"}
                        size="sm"
                        aria-pressed={filter === item.value}
                        onClick={() => setFilter(item.value)}
                    >
                        {item.label}
                        <span className="ml-1.5 tabular-nums opacity-70">
                            {countFor(item.value)}
                        </span>
                    </Button>
                ))}
            </div>

            {visible.length > 0 ? (
                <div className="space-y-3">
                    {visible.map((offer) => (
                        <OfferRow
                            key={offer.id}
                            offer={offer}
                            onWithdraw={withdraw}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={FileText}
                    title={
                        filter === "all"
                            ? "No active offers yet"
                            : "No offers with this status"
                    }
                    description={
                        filter === "all"
                            ? "Offers you submit on a property will appear here."
                            : "Try a different status filter."
                    }
                    action={
                        <Link href="/search">
                            <Button variant="primary" size="sm">
                                Browse Properties
                            </Button>
                        </Link>
                    }
                />
            )}
        </div>
    );
}
