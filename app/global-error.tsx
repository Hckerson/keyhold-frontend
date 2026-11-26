"use client";

import "@/styles/globals.css";
import { RootDocument } from "@/components/layout/root-document";
import { PageUnavailable } from "@/components/patterns/page-unavailable";

export default function GlobalError({ reset }: { reset: () => void }) {
    return (
        <RootDocument>
            <PageUnavailable onRetry={reset} />
        </RootDocument>
    );
}
