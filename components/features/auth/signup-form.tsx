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
import { useRegister } from "@/lib/hooks/use-register";
import {
    AUTH_ROUTES,
    isSafeRedirect,
    portalForRole,
    withRedirect,
} from "@/lib/constants";
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

const footerEntries = (redirectTo?: string) => [
    {
        label: "Already a member",
        href: withRedirect(AUTH_ROUTES.login, redirectTo),
        action: "Sign in",
    },
    {
        label: "Your data",
        href: AUTH_ROUTES.privacy,
        action: "Privacy policy",
    },
];

export interface SignupFormProps {
    redirectTo?: string;
}

export function SignupForm({ redirectTo }: SignupFormProps) {
    const router = useRouter();
    const register = useRegister();

    const [values, setValues] = useState(INITIAL_VALUES);
    const [role, setRole] = useState<SignupRole | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});

    const { pending, error: formError } = register;

    const submission = { ...values, role, acceptedTerms };
    const parsed = signupSchema.safeParse(submission);

    const handleChange =
        (field: keyof SignupFieldValues) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setValues((current) => ({ ...current, [field]: value }));
            setErrors((current) => ({ ...current, [field]: undefined }));
            register.clearError();
        };

    const handleBlur = (field: keyof SignupFieldValues) => () =>
        setErrors((current) => ({
            ...current,
            [field]: fieldErrorFor(signupSchema, submission, field),
        }));

    const handleRoleChange = (next: SignupRole) => {
        setRole(next);
        setErrors((current) => ({ ...current, role: undefined }));
        register.clearError();
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

        try {
            const user = await register.submit({
                fullName: parsed.data.fullName,
                email: parsed.data.email,
                password: parsed.data.password,
                role: parsed.data.role,
            });

            router.replace(
                isSafeRedirect(redirectTo)
                    ? redirectTo
                    : portalForRole(user.role),
            );
        } catch {
            return;
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
                redirectTo={redirectTo}
                disabled={pending}
            />

            <AuthTitleBlock entries={footerEntries(redirectTo)} />
        </AuthPlane>
    );
}

SignupForm.displayName = "SignupForm";
