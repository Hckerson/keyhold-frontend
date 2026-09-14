import { ProsePage } from "@/components/patterns/prose-page";
import { TERMS_PAGE } from "@/lib/data/terms-page";

export const metadata = {
    title: "Terms | Luxury Real Estate Marketplace",
    description: TERMS_PAGE.lede,
};

export default function TermsPage() {
    return <ProsePage page={TERMS_PAGE} />;
}
