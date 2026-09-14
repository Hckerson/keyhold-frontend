import { JournalIndex } from "@/components/sections/site/journal-index";
import { propertiesServerAPI } from "@/lib/api/server";
import {
    JOURNAL_COPY,
    JOURNAL_ENTRIES,
    JOURNAL_LATEST_QUERY,
    toJournalLatest,
} from "@/lib/data/journal";

export const metadata = {
    title: "Journal | Luxury Real Estate Marketplace",
    description: JOURNAL_COPY.lede,
};

export default async function BlogPage() {
    const page =
        JOURNAL_ENTRIES.length > 0
            ? null
            : await propertiesServerAPI.list(JOURNAL_LATEST_QUERY);

    return <JournalIndex latest={toJournalLatest(page)} />;
}
