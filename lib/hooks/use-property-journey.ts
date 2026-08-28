"use client";

import { useCallback, useMemo } from "react";
import { journeyActions, propertyJourney } from "@/lib/data/property-journey";
import {
    useCreateConnection,
    useMyInterests,
} from "@/lib/hooks/use-connections";
import { useCreateOffer } from "@/lib/hooks/use-offers";
import { useSavedToggle } from "@/lib/hooks/use-saved-toggle";
import { usePurchases } from "@/lib/hooks/use-transactions";
import { useRequestViewing } from "@/lib/hooks/use-viewings";
import type { CreateOfferInput } from "@/lib/validations/offer";
import type { CreateViewingInput } from "@/lib/validations/viewing";

type ViewingRequest = Omit<CreateViewingInput, "connectionId">;
type OfferRequest = Omit<CreateOfferInput, "connectionId">;

export function usePropertyJourney(propertyId: string) {
    const saved = useSavedToggle();
    const interests = useMyInterests(saved.signedIn);
    const purchases = usePurchases(saved.signedIn);

    const createConnection = useCreateConnection();
    const requestViewing = useRequestViewing();
    const createOffer = useCreateOffer();

    const journey = useMemo(
        () =>
            propertyJourney(
                propertyId,
                interests.data ?? [],
                saved.savedIds,
                purchases.data ?? [],
            ),
        [propertyId, interests.data, saved.savedIds, purchases.data],
    );

    const actions = useMemo(() => journeyActions(journey), [journey]);

    const registerInterest = useCallback(() => {
        if (!saved.requireSignIn()) return;
        createConnection.mutate({ propertyId });
    }, [saved, createConnection, propertyId]);

    const bookViewing = useCallback(
        async (input: ViewingRequest) => {
            const connectionId = journey.connectionId;
            if (!connectionId) return false;
            try {
                await requestViewing.mutateAsync({ ...input, connectionId });
                return true;
            } catch {
                return false;
            }
        },
        [requestViewing, journey.connectionId],
    );

    const placeOffer = useCallback(
        async (input: OfferRequest) => {
            const connectionId = journey.connectionId;
            if (!connectionId) return false;
            try {
                await createOffer.mutateAsync({ ...input, connectionId });
                return true;
            } catch {
                return false;
            }
        },
        [createOffer, journey.connectionId],
    );

    return {
        journey,
        actions,
        signedIn: saved.signedIn,
        settling:
            saved.settling ||
            (saved.signedIn && (interests.isPending || purchases.isPending)),
        savePending: saved.pending,
        interestPending: createConnection.isPending,
        interestFailed: createConnection.isError,
        viewingPending: requestViewing.isPending,
        viewingFailed: requestViewing.isError,
        offerPending: createOffer.isPending,
        offerFailed: createOffer.isError,
        toggleSave: () => saved.toggle(propertyId),
        registerInterest,
        bookViewing,
        placeOffer,
    };
}
