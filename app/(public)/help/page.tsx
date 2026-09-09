import { ProsePage } from "@/components/patterns/prose-page";
import { HELP_PAGE } from "@/lib/data/help-page";

export const metadata = {
    title: "Help | Luxury Real Estate Marketplace",
    description: HELP_PAGE.lede,
};

export default function HelpPage() {
    return <ProsePage page={HELP_PAGE} />;
}
