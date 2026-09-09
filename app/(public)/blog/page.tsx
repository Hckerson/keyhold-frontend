import { JournalIndex } from "@/components/sections/site/journal-index";
import { JOURNAL_COPY } from "@/lib/data/journal";

export const metadata = {
    title: "Journal | Luxury Real Estate Marketplace",
    description: JOURNAL_COPY.lede,
};

export default function BlogPage() {
    return <JournalIndex />;
}
