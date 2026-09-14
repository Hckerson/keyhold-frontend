import { BRAND_NAME } from "@/components/brand/wordmark";
import type { ProsePage } from "@/lib/types";

export const ABOUT_PAGE: ProsePage = {
    eyebrow: "About",
    title: "A quieter way to buy an extraordinary house",
    lede: `${BRAND_NAME} is a marketplace for architectural and estate property, built for the part of the market where the listing is the beginning of a conversation rather than the end of one.`,
    blocks: [
        {
            id: "why",
            heading: "Why we built it",
            paragraphs: [
                "Most property portals optimise for volume. They are very good at showing you nine hundred houses and almost useless once you care about three of them.",
                "The interesting work happens after the search: arranging a viewing that fits a real week, understanding what a comparable actually sold for, putting an offer together, and holding funds safely while the paperwork catches up. That is the part we built.",
            ],
        },
        {
            id: "how",
            heading: "How it works",
            paragraphs: [
                "Every listing has a named advisor behind it. When you enquire, you open a thread with that person rather than a lead form that disappears into a queue.",
                "From that thread you can propose viewing times, exchange documents, submit an offer with its terms, and follow the transaction through escrow to completion — without leaving the platform or losing the record of what was agreed.",
            ],
            bullets: [
                "Save homes and searches, and be alerted when a price moves or a match appears.",
                "Propose viewing times; the listing office confirms one of them.",
                "Make an offer, receive a counter, and see every step on a dated timeline.",
                "Settle through escrow, with funds released only against the agreed conditions.",
            ],
        },
        {
            id: "advisors",
            heading: "For advisors",
            paragraphs: [
                "Agents get a working desk rather than a shop window: a lead book ranked by genuine intent, a pipeline that reflects where each deal actually stands, a calendar that writes as well as reads, and analytics that measure production instead of impressions.",
                "Listings are composed in one place — identity, media, lifecycle and extras — and every change is recorded.",
            ],
        },
        {
            id: "standards",
            heading: "What we hold ourselves to",
            paragraphs: [
                "Listings are reviewed before they go live, and agent credentials are verified before an account can transact. Where a rule is enforced, we say so plainly rather than burying it.",
                "We would rather show a number we can stand behind than a number that looks better. Where the data is thin, the interface says so.",
            ],
        },
    ],
};
