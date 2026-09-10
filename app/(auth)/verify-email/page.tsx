import { VerifyEmailForm } from "@/components/features/auth/verify-email-form";
import { isSafeRedirect, REDIRECT_PARAM } from "@/lib/constants";

export const metadata = {
    title: "Confirm Email | Luxury Real Estate",
    description: "Confirm the email address on your account.",
};

export default async function VerifyEmailPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    const params = await searchParams;
    const target = params[REDIRECT_PARAM];

    return (
        <VerifyEmailForm
            email={params.email}
            redirectTo={isSafeRedirect(target) ? target : undefined}
        />
    );
}
