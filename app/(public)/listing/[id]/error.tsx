"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

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
                            <Button variant="primary" size="sm" onClick={reset}>
                                Try again
                            </Button>
                            <Link href="/search">
                                <Button variant="secondary" size="sm">
                                    Back to search
                                </Button>
                            </Link>
                        </div>
                    }
                />
            </div>
        </Container>
    );
}
