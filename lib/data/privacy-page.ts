import { BRAND_NAME } from "@/components/brand/wordmark";
import { SUPPORT_EMAIL } from "@/lib/config/site-contact";
import type { ProsePage } from "@/lib/types";

export const PRIVACY_PAGE: ProsePage = {
    eyebrow: "Legal",
    title: "Privacy",
    lede: `What ${BRAND_NAME} collects, why it collects it, and what you can do about it. Written to describe how the platform actually behaves rather than to cover every theoretical case.`,
    updated: "26 September 2026",
    blocks: [
        {
            id: "collect",
            heading: "What we collect",
            paragraphs: [
                "Account details you give us: your name, email address, phone number where you provide one, an optional profile photo, and the role you signed up as.",
                "Activity you generate by using the platform: the homes you save, the searches you store, the enquiries you open, the messages and documents you exchange, the viewings you request, the offers you make, and the transactions you complete.",
                "Verification material, where a tier or an agent licence requires it: identity documents and a face image, held for review.",
                "Operational records: notification preferences, moderation and audit entries, and a log of outbound contact made through the platform.",
            ],
        },
        {
            id: "why",
            heading: "Why we hold it",
            paragraphs: [
                "To run the service you asked for — showing your saved homes, delivering your alerts, routing your messages to the right advisor, and carrying an offer through to completion.",
                "To keep the marketplace safe: verifying agents, reviewing listings before they go live, and investigating disputes.",
                "To meet obligations attached to money movement and identity verification.",
            ],
        },
        {
            id: "processors",
            heading: "Who else processes it",
            paragraphs: [
                "We use a small number of third parties, each for one job. We do not sell personal data, and we do not share it for advertising.",
            ],
            bullets: [
                "Stripe — card payments and escrow. Card details go to Stripe directly; we never hold them.",
                "Cloudinary — storage for listing photography, verification documents, message attachments and generated agreements.",
                "Our SMTP email provider — transactional email, including password resets, verification codes, advisor correspondence and newsletter confirmations.",
                "Twilio — SMS notifications, and call bridging so neither party learns the other's number.",
                "OpenFreeMap — map tiles. Your viewport is requested from their servers when a map renders.",
            ],
        },
        {
            id: "newsletter",
            heading: "The newsletter",
            paragraphs: [
                "Signing up in the footer stores your email address, the exact consent wording you saw, where you signed up and when. Nothing else is attached to it, and it is not linked to an account.",
                "You are not on the list until you confirm from the email we send. An address that is never confirmed is deleted after its three-day confirmation link expires.",
                "Every newsletter email carries an unsubscribe link, and so does the confirmation email. When you unsubscribe we keep your address marked as unsubscribed, so it is never sent to again; if you want it erased entirely, write to us.",
            ],
        },
        {
            id: "retention",
            heading: "How long we keep it",
            paragraphs: [
                "Account and activity data is kept while your account is open. Deleting your account marks it deleted and detaches it from the public surface; records tied to a completed transaction, a dispute, or a legal obligation are retained for as long as that obligation lasts.",
                "Expired verification tokens are purged. Audit entries are retained deliberately, because their purpose is to record who changed what.",
            ],
        },
        {
            id: "rights",
            heading: "Your choices",
            paragraphs: [
                "From your settings you can change your profile, tune which notifications reach you and by which channel, adjust privacy controls, download your data, and delete your account.",
                `For anything the settings screen does not cover — a correction, an objection, or a question about a specific record — write to ${SUPPORT_EMAIL} and a person will answer.`,
            ],
        },
        {
            id: "security",
            heading: "Security",
            paragraphs: [
                "Passwords are hashed, never stored in readable form. Sessions are token-based and expire. Access to a conversation, viewing or offer is gated on being a party to it.",
                "No system is perfect. If you believe an account has been accessed without permission, contact us and we will act on it.",
            ],
        },
    ],
};
