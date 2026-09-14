import { PageIntro } from "@/components/patterns/page-intro";
import { SectionShell } from "@/components/patterns/section-shell";
import { ContactRouteList } from "@/components/sections/site/contact-route-list";
import { CONTACT_COPY, CONTACT_GROUPS } from "@/lib/data/contact-page";

export const metadata = {
    title: "Contact | Luxury Real Estate Marketplace",
    description: CONTACT_COPY.lede,
};

export default function ContactPage() {
    return (
        <SectionShell className="section-pady">
            <PageIntro {...CONTACT_COPY} />

            <div className="mt-10 flex max-w-[68ch] flex-col gap-8">
                {CONTACT_GROUPS.map((group) => (
                    <ContactRouteList key={group.id} group={group} />
                ))}
            </div>
        </SectionShell>
    );
}
