import { Mail } from "lucide-react";
import type { ContactRoute } from "@/lib/types";

export const aContactRoute = (
    overrides: Partial<ContactRoute> = {},
): ContactRoute => ({
    id: "support",
    label: "Support",
    detail: "Anything about your account, a listing, or a transaction.",
    action: "support@keyhol.me",
    href: "mailto:support@keyhol.me",
    icon: Mail,
    note: "Usually replies in one business day",
    ...overrides,
});
