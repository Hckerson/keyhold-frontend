import type { UserRole } from "@/lib/enums/enums";

export interface UserInviteDraft {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: UserRole;
}

const ROLE_LABELS: Record<UserRole, string> = {
    ADMIN: "Administrator",
    BUYER: "Buyer",
    SELLER: "Agent",
};

const ROLE_CAPTIONS: Record<UserRole, string> = {
    BUYER: "Browses, saves and makes offers",
    SELLER: "Lists homes and runs deals",
    ADMIN: "Full access to this console",
};

const ROLE_ORDER: UserRole[] = ["BUYER", "SELLER", "ADMIN"];

export const USER_ROLE_CHOICES = ROLE_ORDER.map((id) => ({
    id,
    label: ROLE_LABELS[id],
    caption: ROLE_CAPTIONS[id],
}));

export const STARTING_PASSWORD_LENGTH = 14;

export const EMPTY_USER_INVITE_DRAFT: UserInviteDraft = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "BUYER",
};

export const USER_INVITE_COPY = {
    title: "Add a user",
    lede: "The account goes live as soon as you create it.",
    passwordHint:
        "Share it with them privately. They are asked to change it at first sign-in.",
    generate: "Generate",
    name: "Full name",
    email: "Email address",
    password: "Starting password",
    phone: "Phone number",
    role: "Role",
    roleLabel: "Account role",
    optional: "Optional",
    cancel: "Cancel",
    submit: "Create account",
    failed: "That account could not be created.",
    retry: "Check the details and try again.",
} as const;
