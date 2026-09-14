import Link from "next/link";
import { HousePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PUBLIC_ROUTES } from "@/lib/constants";

export function ListingUnavailable() {
    return (
        <Container className="py-16">
            <div className="w-full">
                <EmptyState
                    icon={HousePlus}
                    title="This listing is no longer available"
                    description="It may have sold, been withdrawn, or the link may be out of date. The rest of the collection is still open to you."
                    action={
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <Button asChild emphasis="solid" tone="accent">
                                <Link href={PUBLIC_ROUTES.search}>
                                    Browse listings
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/contact">Speak to an advisor</Link>
                            </Button>
                        </div>
                    }
                />
            </div>
        </Container>
    );
}

ListingUnavailable.displayName = "ListingUnavailable";
