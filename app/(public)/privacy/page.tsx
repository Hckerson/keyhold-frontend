import { ProsePage } from "@/components/patterns/prose-page";
import { PRIVACY_PAGE } from "@/lib/data/privacy-page";

export const metadata = {
    title: "Privacy | Luxury Real Estate Marketplace",
    description: PRIVACY_PAGE.lede,
};

export default function PrivacyPage() {
    return <ProsePage page={PRIVACY_PAGE} />;
}
