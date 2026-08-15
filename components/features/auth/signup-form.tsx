"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    AuthFormError,
    AuthFormHeader,
    AuthPlane,
    AuthSubmit,
    AuthTitleBlock,
    SocialAuthRow,
    type SignupRole,
} from "@/components/features/auth/parts";
import {
    SignupFields,
    type SignupFieldValues,
} from "@/components/features/auth/signup-fields";
import { apiClient } from "@/lib/api/client";
import {
    ACCESS_TOKEN_COOKIE,
    AUTH_ENDPOINTS,
    AUTH_ROUTES,
    SESSION_DAYS,
    portalForRole,
} from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { AuthResponse } from "@/lib/types/auth";
import { setCookie } from "@/lib/utils/cookies";
import { errorMessage } from "@/lib/utils/api-error";
import {
    fieldErrorFor,
    signupSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const INITIAL_VALUES: SignupFieldValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SIGN_UP_FAILED =
    "We couldn't create your account. Review your details and try again.";

const FOOTER_ENTRIES = [
    {
        label: "Already a member",
        href: AUTH_ROUTES.login,
        action: "Sign in",
    },
    {
        label: "Your data",
        href: AUTH_ROUTES.privacy,
        action: "Privacy policy",
    },
];

export function SignupForm() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [values, setValues] = useState(INITIAL_VALUES);
    const [role, setRole] = useState<SignupRole | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const submission = { ...values, role, acceptedTerms };
    const parsed = signupSchema.safeParse(submission);

    const handleChange =
        (field: keyof SignupFieldValues) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setValues((current) => ({ ...current, [field]: value }));
            setErrors((current) => ({ ...current, [field]: undefined }));
            setFormError(null);
        };

    const handleBlur = (field: keyof SignupFieldValues) => () =>
        setErrors((current) => ({
            ...current,
            [field]: fieldErrorFor(signupSchema, submission, field),
        }));

    const handleRoleChange = (next: SignupRole) => {
        setRole(next);
        setErrors((current) => ({ ...current, role: undefined }));
        setFormError(null);
    };

    const handleTermsChange = (accepted: boolean) => {
        setAcceptedTerms(accepted);
        setErrors((current) => ({ ...current, acceptedTerms: undefined }));
    };

    const handleTermsBlur = () =>
        setErrors((current) => ({
            ...current,
            acceptedTerms: fieldErrorFor(
                signupSchema,
                submission,
                "acceptedTerms",
            ),
        }));

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;
        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        setPending(true);
        setFormError(null);

        try {
            const { data } = await apiClient.post<{ data: AuthResponse }>(
                AUTH_ENDPOINTS.register,
                {
                    fullName: parsed.data.fullName,
                    email: parsed.data.email,
                    password: parsed.data.password,
                    role: parsed.data.role,
                },
            );
            const { user, accessToken } = data.data;

            setAuth(user, accessToken);
            setCookie(ACCESS_TOKEN_COOKIE, accessToken, SESSION_DAYS);
            router.replace(portalForRole(user.role));
        } catch (error) {
            setFormError(errorMessage(error, SIGN_UP_FAILED));
            setPending(false);
        }
    };

    return (
        <AuthPlane>
            <AuthFormHeader
                kicker="New application"
                title="Begin your application"
                description="Apply for access to the marketplace — as a buyer seeking a residence, or an agent presenting one."
            />

            <AuthFormError title="Application failed" message={formError} />

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="flex flex-col gap-4"
            >
                <SignupFields
                    values={values}
                    role={role}
                    acceptedTerms={acceptedTerms}
                    errors={errors}
                    pending={pending}
                    onRoleChange={handleRoleChange}
                    onFieldChange={handleChange}
                    onFieldBlur={handleBlur}
                    onTermsChange={handleTermsChange}
                    onTermsBlur={handleTermsBlur}
                />

                <AuthSubmit
                    label="Create account"
                    pendingLabel="Creating account"
                    pending={pending}
                    disabled={!parsed.success}
                />
            </form>

            <SocialAuthRow
                action="Sign up"
                label="Or apply with"
                disabled={pending}
            />

            <AuthTitleBlock entries={FOOTER_ENTRIES} />
        </AuthPlane>
    );
}

SignupForm.displayName = "SignupForm";
