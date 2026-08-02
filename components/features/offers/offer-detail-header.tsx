"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { OfferDetailActions } from "@/components/features/offers/offer-detail-actions";
import type { OfferDetail } from "@/lib/data/offer-details";
import { formatUsd } from "@/lib/utils";
import type { OfferStatus } from "@/lib/types";

export interface OfferDetailHeaderProps {
    detail: OfferDetail;
    status: OfferStatus;
    closed: boolean;
    canCounter: boolean;
    onAccept: () => void;
    onCounter: () => void;
    onWithdraw: () => void;
}

export function OfferDetailHeader({
    detail,
    status,
    closed,
    canCounter,
    onAccept,
    onCounter,
    onWithdraw,
}: OfferDetailHeaderProps) {
    return (
        <>
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
                    <OfferDetailActions
                        status={status}
                        closed={closed}
                        canAccept={!closed && detail.counterPrice !== undefined}
                        canCounter={canCounter}
                        onAccept={onAccept}
                        onCounter={onCounter}
                        onWithdraw={onWithdraw}
                    />
                }
            />
        </>
    );
}
