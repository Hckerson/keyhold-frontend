import { ProsePage } from "@/components/patterns/prose-page";
import { ACCESSIBILITY_PAGE } from "@/lib/data/accessibility-page";

export const metadata = {
    title: "Accessibility | Luxury Real Estate Marketplace",
    description: ACCESSIBILITY_PAGE.lede,
};

export default function AccessibilityPage() {
    return <ProsePage page={ACCESSIBILITY_PAGE} />;
}
