import { SUPPORT_EMAIL, RESPONSE_WINDOW } from "@/lib/config/site-contact";
import type { ProsePage } from "@/lib/types";

export const HELP_PAGE: ProsePage = {
    eyebrow: "Support",
    title: "Help",
    lede: "How the main flows work, and what to do when one of them does not.",
    blocks: [
        {
            id: "searching",
            heading: "Finding a property",
            paragraphs: [
                "Search filters by price band, property type, bedrooms, bathrooms and floor area. Each price band shows how many homes sit inside it, so you can see where the inventory actually is before you narrow.",
                "Results render as a grid, a list, or on a map. Saving a search stores those filters and tells you when a new listing matches them.",
            ],
        },
        {
            id: "viewings",
            heading: "Arranging a viewing",
            paragraphs: [
                "Open a listing and request a viewing. You propose the times that suit you and the listing office confirms one of them, which avoids the back-and-forth of a single fixed slot.",
                "Confirmed viewings appear under Viewings in your dashboard, where you can reschedule or cancel. If a time no longer works, reschedule rather than cancelling — it keeps the thread with your advisor intact.",
            ],
        },
        {
            id: "offers",
            heading: "Making an offer",
            paragraphs: [
                "Offers carry an amount and your terms. Once submitted, the seller can accept, counter, or decline, and every step is stamped on the offer timeline so there is no argument later about what was said when.",
                "A counter-offer does not expire your original position; you can accept the counter or continue the conversation in the thread attached to the offer.",
            ],
        },
        {
            id: "documents",
            heading: "Sending documents",
            paragraphs: [
                "You can attach files to any message. Images and PDFs up to 10 MB are accepted, five at a time.",
                "Everything shared in a conversation is collected in the Shared Documents panel beside the thread, so you do not have to scroll back through months of messages to find a survey.",
            ],
        },
        {
            id: "alerts",
            heading: "Alerts and notifications",
            paragraphs: [
                "Alerts cover price drops, new matches, offer responses, viewing confirmations and messages. Each type can be turned on or off independently, and routed to email, SMS or in-app.",
                "If you are receiving too much, change the type rather than muting everything — offer responses and viewing confirmations are the ones worth keeping on.",
            ],
        },
        {
            id: "account",
            heading: "Your account",
            paragraphs: [
                "Settings holds your profile, communication preferences, privacy controls, password change, a data download, and account deletion.",
                "Forgot your password? Use the reset link on the sign-in page. It emails a single-use link rather than a code to transcribe.",
            ],
        },
        {
            id: "stuck",
            heading: "Still stuck",
            paragraphs: [
                `Write to ${SUPPORT_EMAIL} and a person will answer, usually within ${RESPONSE_WINDOW}. Include the listing or offer you are asking about and we can look at the record directly.`,
                "If you are already talking to an advisor about a property, the fastest route is the message thread you already have with them.",
            ],
        },
    ],
};
