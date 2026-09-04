"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export default function SearchError({ reset }: { reset: () => void }) {
    return (
        <Container className="py-16">
            <div className="w-full">
                <EmptyState
                    icon={TriangleAlert}
                    title="We couldn't load these results"
                    description="The search index did not respond. Your filters are still saved — try again, or browse the featured collection instead."
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
                                <Link href="/">Back to home</Link>
                            </Button>
                        </div>
                    }
                />
            </div>
        </Container>
    );
}
