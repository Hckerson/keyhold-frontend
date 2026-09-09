import { ProsePage } from "@/components/patterns/prose-page";
import { ContactChannels } from "@/components/sections/site/contact-channels";
import { CONTACT_PAGE } from "@/lib/data/contact-page";

export const metadata = {
    title: "Contact | Luxury Real Estate Marketplace",
    description: CONTACT_PAGE.lede,
};

export default function ContactPage() {
    return (
        <ProsePage page={CONTACT_PAGE}>
            <ContactChannels />
        </ProsePage>
    );
}
