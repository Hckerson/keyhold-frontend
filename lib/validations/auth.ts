import { z } from "zod";

export const MIN_PASSWORD_LENGTH = 8;
export const MIN_NAME_LENGTH = 3;

const emailField = z.email("Enter a valid email address");

const passwordField = z
    .string()
    .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );

const matchingPasswords = <
    T extends { password: string; confirmPassword: string },
>(
    values: T,
) => values.password === values.confirmPassword;

const passwordPair = z.object({
    password: z.string(),
    confirmPassword: z.string(),
});

const mismatchIssue = {
    error: "Passwords do not match",
    path: ["confirmPassword"],
    when: ({ value }: z.core.ParsePayload) =>
        passwordPair.safeParse(value).success,
};

export const loginSchema = z.object({
    email: emailField,
    password: z.string().min(1, "Enter your password"),
});

export const signupSchema = z
    .object({
        fullName: z
            .string()
            .min(
                MIN_NAME_LENGTH,
                `Full name must be at least ${MIN_NAME_LENGTH} characters`,
            ),
        email: emailField,
        password: passwordField,
        confirmPassword: z.string(),
        role: z.enum(["BUYER", "SELLER"], {
            error: "Tell us how you'll use the marketplace",
        }),
        acceptedTerms: z.literal(true, {
            error: "Accept the terms to continue",
        }),
    })
    .refine(matchingPasswords, mismatchIssue);

export const resetPasswordSchema = z.object({
    email: emailField,
});

export const newPasswordSchema = z
    .object({
        password: passwordField,
        confirmPassword: z.string(),
    })
    .refine(matchingPasswords, mismatchIssue);

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;

export type FieldErrors = Record<string, string | undefined>;

export const toFieldErrors = (error: z.ZodError): FieldErrors =>
    error.issues.reduce<FieldErrors>((collected, issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && !collected[key]) {
            collected[key] = issue.message;
        }
        return collected;
    }, {});

export const clearFieldError = (
    errors: FieldErrors,
    field: string,
): FieldErrors =>
    field === "password"
        ? { ...errors, password: undefined, confirmPassword: undefined }
        : { ...errors, [field]: undefined };

export const fieldErrorFor = (
    schema: z.ZodType,
    values: unknown,
    field: string,
): string | undefined => {
    const result = schema.safeParse(values);
    return result.success ? undefined : toFieldErrors(result.error)[field];
};

export const EMAIL_CODE_LENGTH = 6;

export const verifyEmailSchema = z.object({
    code: z
        .string()
        .length(EMAIL_CODE_LENGTH, `Enter the ${EMAIL_CODE_LENGTH}-digit code`)
        .regex(/^\d+$/, "The code is digits only"),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
