"use client";

import { PageUnavailable } from "@/components/patterns/page-unavailable";

export default function AppError({ reset }: { reset: () => void }) {
    return <PageUnavailable onRetry={reset} />;
}
