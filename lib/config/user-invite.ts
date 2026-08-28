import { USER_ROLES, type UserRole } from "@/lib/enums/enums";

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
    SELLER: "Agent / Seller",
};

export const USER_ROLE_OPTIONS = USER_ROLES.map((value) => ({
    value,
    label: ROLE_LABELS[value],
}));

export const EMPTY_USER_INVITE_DRAFT: UserInviteDraft = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "BUYER",
};

export const USER_INVITE_COPY = {
    title: "Add a user",
    hint: "The account is created immediately. Share the starting password with them and ask them to change it on first sign-in.",
    name: "Full name",
    email: "Email address",
    password: "Starting password",
    phone: "Phone number",
    role: "Role",
    optional: "Optional",
    cancel: "Cancel",
    submit: "Create account",
    failed: "That account could not be created.",
    retry: "Check the details — the email may already be registered.",
} as const;
