import Link from "next/link";
import { Compass } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

const TITLE = "We couldn't find that page";
const DESCRIPTION =
    "The link may have expired, or the listing may have been withdrawn. Browse the current collection instead.";

export default function NotFound() {
    return (
        <AppLayout>
            <Container className="py-16">
                <div className="w-full">
                    <EmptyState
                        icon={Compass}
                        title={TITLE}
                        description={DESCRIPTION}
                        action={
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <Button
                                    asChild
                                    emphasis="solid"
                                    tone="accent"
                                    size="sm"
                                >
                                    <Link href="/search">Browse listings</Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link href="/">Back to home</Link>
                                </Button>
                            </div>
                        }
                    />
                </div>
            </Container>
        </AppLayout>
    );
}
