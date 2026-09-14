"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PUBLIC_ROUTES } from "@/lib/constants";

export default function ListingError({ reset }: { reset: () => void }) {
    return (
        <Container className="py-16">
            <div className="w-full">
                <EmptyState
                    icon={TriangleAlert}
                    title="We couldn't load this property"
                    description="The dossier failed to load. Try again, or speak to an advisor who can send the details across directly."
                    action={
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <Button
                                emphasis="solid"
                                tone="accent"
                                onClick={reset}
                            >
                                Try again
                            </Button>
                            <Button asChild>
                                <Link href={PUBLIC_ROUTES.search}>
                                    Back to search
                                </Link>
                            </Button>
                        </div>
                    }
                />
            </div>
        </Container>
    );
}
