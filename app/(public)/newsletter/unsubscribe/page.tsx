import { SectionShell } from "@/components/patterns/section-shell";
import { NewsletterTokenStatus } from "@/components/features/shared/newsletter-token-status";
import { NEWSLETTER_PAGES } from "@/lib/config/newsletter";

export const metadata = {
    title: `${NEWSLETTER_PAGES.unsubscribe.metaTitle} | Luxury Real Estate Marketplace`,
    robots: { index: false, follow: false },
};

export default async function NewsletterUnsubscribePage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    return (
        <SectionShell className="section-pady">
            <NewsletterTokenStatus action="unsubscribe" token={token} />
        </SectionShell>
    );
}
