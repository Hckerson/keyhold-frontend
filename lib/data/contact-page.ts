import {
    Building2,
    Home,
    Mail,
    MessageSquare,
    Newspaper,
    ShieldAlert,
} from "lucide-react";
import { SUPPORT_EMAIL, RESPONSE_WINDOW } from "@/lib/config/site-contact";
import { AUTH_ROUTES, BUYER_ROUTES, PUBLIC_ROUTES } from "@/lib/constants";
import type { ContactRouteGroup } from "@/lib/types";
import { mailHref } from "@/lib/utils/format";

const PRESS_SUBJECT = "Press";
const PROBLEM_SUBJECT = "Problem report";

export const CONTACT_COPY = {
    eyebrow: "Contact",
    title: "Talk to us",
    lede: "Pick the route that matches what you need. Messages reach a person, not a queue.",
} as const;

export const CONTACT_GROUPS: readonly ContactRouteGroup[] = [
    {
        id: "help",
        heading: "Get help",
        routes: [
            {
                id: "support",
                label: "Support",
                detail: "Anything about your account, a listing, or a transaction.",
                action: SUPPORT_EMAIL,
                href: mailHref(SUPPORT_EMAIL),
                icon: Mail,
                note: `Usually replies in ${RESPONSE_WINDOW}`,
            },
            {
                id: "advisor",
                label: "Your advisor",
                detail: "Already enquired about a property? The thread you have with that advisor is the fastest route, and it keeps the record in one place.",
                action: "Open messages",
                href: BUYER_ROUTES.messages,
                icon: MessageSquare,
                note: "Sign-in required",
            },
            {
                id: "listing",
                label: "About a specific home",
                detail: "Enquire from the listing itself. It opens a thread with the named advisor behind that property rather than a general queue.",
                action: "Browse listings",
                href: PUBLIC_ROUTES.search,
                icon: Home,
            },
        ],
    },
    {
        id: "enquiries",
        heading: "Other enquiries",
        routes: [
            {
                id: "press",
                label: "Press and partnerships",
                detail: "We route it to whoever can actually answer rather than sending you a media pack.",
                action: "Email a press enquiry",
                href: mailHref(SUPPORT_EMAIL, PRESS_SUBJECT),
                icon: Newspaper,
                note: `Subject · ${PRESS_SUBJECT}`,
            },
            {
                id: "list-with-us",
                label: "Listing with us",
                detail: "Advisors and sellers create an agent account directly. Licence verification runs before an account can list or transact, so have your credentials to hand.",
                action: "Create an account",
                href: AUTH_ROUTES.signup,
                icon: Building2,
                note: "Licence check required",
            },
            {
                id: "problem",
                label: "Reporting a problem",
                detail: "Security issues, suspected account access, and accessibility barriers are treated as defects rather than feedback. Tell us what happened and what you expected.",
                action: "Report a problem",
                href: mailHref(SUPPORT_EMAIL, PROBLEM_SUBJECT),
                icon: ShieldAlert,
                note: `Subject · ${PROBLEM_SUBJECT}`,
            },
        ],
    },
];
