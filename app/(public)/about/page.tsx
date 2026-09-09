import { ProsePage } from "@/components/patterns/prose-page";
import { ABOUT_PAGE } from "@/lib/data/about-page";

export const metadata = {
    title: "About | Luxury Real Estate Marketplace",
    description: ABOUT_PAGE.lede,
};

export default function AboutPage() {
    return <ProsePage page={ABOUT_PAGE} />;
}
