"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { APP_ERROR } from "@/lib/constants";

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
                                {APP_ERROR.retry}
                            </Button>
                            <Button asChild>
                                <Link href="/">{APP_ERROR.home}</Link>
                            </Button>
                        </div>
                    }
                />
            </div>
        </Container>
    );
}
