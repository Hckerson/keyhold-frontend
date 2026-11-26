import { MAIN_CONTENT_ID, SKIP_LINK_LABEL } from "@/lib/constants";

export function SkipLink() {
    return (
        <a
            href={`#${MAIN_CONTENT_ID}`}
            className="focus-visible:bg-background focus-visible:text-text focus-visible:ring-accent focus-visible:z-toast sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:rounded-md focus-visible:px-3 focus-visible:py-2 focus-visible:text-xs focus-visible:font-medium focus-visible:shadow-md focus-visible:ring-2 focus-visible:outline-none"
        >
            {SKIP_LINK_LABEL}
        </a>
    );
}

SkipLink.displayName = "SkipLink";
