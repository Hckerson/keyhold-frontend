import type { HTMLInputTypeAttribute } from "react";
import type {
    JoinRole,
    JoinRoleOption,
} from "@/components/features/auth/join/join-roles";

export type SignupFieldId =
    | "fullName"
    | "email"
    | "password"
    | "confirmPassword";

export interface SignupFieldSpec {
    id: SignupFieldId;
    label: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute;
    autoComplete: string;
    secure: boolean;
    block: "identity" | "credential";
}

export const NAME_FIELD: SignupFieldSpec = {
    id: "fullName",
    label: "Full name",
    placeholder: "Jonathan Doe",
    autoComplete: "name",
    secure: false,
    block: "identity",
};

export const EMAIL_FIELD: SignupFieldSpec = {
    id: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
    secure: false,
    block: "identity",
};

export const PASSWORD_FIELD: SignupFieldSpec = {
    id: "password",
    label: "Password",
    placeholder: "At least 8 characters",
    autoComplete: "new-password",
    secure: true,
    block: "credential",
};

export const CONFIRM_FIELD: SignupFieldSpec = {
    id: "confirmPassword",
    label: "Repeat password",
    placeholder: "Repeat password",
    autoComplete: "new-password",
    secure: true,
    block: "credential",
};

export const IDENTITY_FIELDS: readonly SignupFieldSpec[] = [
    NAME_FIELD,
    EMAIL_FIELD,
];

export const SIGNUP_FIELDS: readonly SignupFieldSpec[] = [
    ...IDENTITY_FIELDS,
    PASSWORD_FIELD,
    CONFIRM_FIELD,
];

export const EMPTY_VALUES: Record<SignupFieldId, string> = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const STRENGTH_TIERS = [
    { label: "Weak", bar: "bg-error", word: "text-error-light" },
    { label: "Fair", bar: "bg-warning", word: "text-warning-light" },
    { label: "Strong", bar: "bg-success", word: "text-success-light" },
] as const;

export const strengthOf = (value: string) => {
    if (value.length < 8) return 0;
    const varied = /[a-z]/.test(value) && /[A-Z0-9]/.test(value);
    return varied && value.length >= 12 ? 2 : 1;
};

export const ROLE_WORD: Record<JoinRole, string> = {
    BUYER: "buyer",
    SELLER: "seller",
};

export const SESSION_DAYS = 7;

export interface DossierSpec {
    key: string;
    value: string;
}

export const dossierSpecs = (option: JoinRoleOption): DossierSpec[] => [
    { key: "Portal", value: `${option.label} workspace` },
    { key: "Access", value: "On approval" },
];

export const SIGNUP_COPY = {
    eyebrow: "Step 02 of 02 · Credentials",
    headLead: "Your",
    headTail: "application.",
    identityLabel: "Applicant",
    credentialLabel: "Credentials",
    strengthHint: "8 characters minimum",
    backLabel: "Change",
    escHint: "ESC",
    showLabel: "Show",
    hideLabel: "Hide",
    submitLabel: "Create account",
    legalLead: "By continuing you agree to our",
    termsLabel: "Terms",
    privacyLabel: "Privacy Policy",
    accountPrompt: "Already have an account?",
    signInLabel: "Sign in",
    failedError: "Signup failed. Please try again.",
    genericError: "Something went wrong. Please try again.",
    progressTemplate: (n: number) => `${n} of 4 details complete`,
} as const;
