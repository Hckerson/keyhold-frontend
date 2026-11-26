import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { APP_ERROR, AUTH_ROUTES } from "@/lib/constants";

export interface PageUnavailableProps {
    onRetry: () => void;
}

export function PageUnavailable({ onRetry }: PageUnavailableProps) {
    return (
        <Container className="py-16">
            <div className="w-full">
                <EmptyState
                    icon={TriangleAlert}
                    title={APP_ERROR.title}
                    description={APP_ERROR.description}
                    action={
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <Button
                                emphasis="solid"
                                tone="accent"
                                onClick={onRetry}
                            >
                                {APP_ERROR.retry}
                            </Button>
                            <Button asChild>
                                <Link href={AUTH_ROUTES.home}>
                                    {APP_ERROR.home}
                                </Link>
                            </Button>
                        </div>
                    }
                />
            </div>
        </Container>
    );
}

PageUnavailable.displayName = "PageUnavailable";
