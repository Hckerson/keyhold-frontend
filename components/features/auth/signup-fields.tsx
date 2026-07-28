"use client";

import type { ChangeEvent } from "react";
import Link from "next/link";
import {
    AuthField,
    AuthRoleChoice,
    type SignupRole,
} from "@/components/features/auth/parts";
import { Checkbox } from "@/components/ui/forms/checkbox";
import { AUTH_ROUTES } from "@/lib/constants";
import { MIN_PASSWORD_LENGTH, type FieldErrors } from "@/lib/validations/auth";

const LEGAL_LINK_CLASS =
    "text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth rounded-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

export interface SignupFieldValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignupFieldsProps {
    values: SignupFieldValues;
    role: SignupRole | null;
    acceptedTerms: boolean;
    errors: FieldErrors;
    pending: boolean;
    onRoleChange: (role: SignupRole) => void;
    onFieldChange: (
        field: keyof SignupFieldValues,
    ) => (event: ChangeEvent<HTMLInputElement>) => void;
    onFieldBlur: (field: keyof SignupFieldValues) => () => void;
    onTermsChange: (accepted: boolean) => void;
    onTermsBlur: () => void;
}

export function SignupFields({
    values,
    role,
    acceptedTerms,
    errors,
    pending,
    onRoleChange,
    onFieldChange,
    onFieldBlur,
    onTermsChange,
    onTermsBlur,
}: SignupFieldsProps) {
    return (
        <fieldset disabled={pending} className="flex flex-col gap-3">
            <AuthRoleChoice
                name="role"
                legend="I'm here for"
                value={role}
                error={errors.role}
                onChange={onRoleChange}
            />

            <AuthField
                label="Full name"
                name="fullName"
                autoComplete="name"
                placeholder="Elena Voss"
                value={values.fullName}
                error={errors.fullName}
                onChange={onFieldChange("fullName")}
                onBlur={onFieldBlur("fullName")}
            />

            <AuthField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                error={errors.email}
                onChange={onFieldChange("email")}
                onBlur={onFieldBlur("email")}
            />

            <AuthField
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                value={values.password}
                error={errors.password}
                onChange={onFieldChange("password")}
                onBlur={onFieldBlur("password")}
            />

            <AuthField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={onFieldChange("confirmPassword")}
                onBlur={onFieldBlur("confirmPassword")}
            />

            <div className="flex flex-col gap-1">
                <Checkbox
                    id="acceptedTerms"
                    name="acceptedTerms"
                    checked={acceptedTerms}
                    aria-invalid={errors.acceptedTerms ? true : undefined}
                    aria-describedby={
                        errors.acceptedTerms ? "acceptedTerms-error" : undefined
                    }
                    onChange={(event) => onTermsChange(event.target.checked)}
                    onBlur={onTermsBlur}
                    label={
                        <>
                            I agree to the{" "}
                            <Link
                                href={AUTH_ROUTES.terms}
                                className={LEGAL_LINK_CLASS}
                            >
                                Terms
                            </Link>{" "}
                            and{" "}
                            <Link
                                href={AUTH_ROUTES.privacy}
                                className={LEGAL_LINK_CLASS}
                            >
                                Privacy Policy
                            </Link>
                        </>
                    }
                />
                {errors.acceptedTerms && (
                    <p id="acceptedTerms-error" className="text-error text-xs">
                        {errors.acceptedTerms}
                    </p>
                )}
            </div>
        </fieldset>
    );
}

SignupFields.displayName = "SignupFields";
