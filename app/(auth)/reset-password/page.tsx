import { ResetPasswordForm } from "@/components/features/auth/reset-password-form";

export const metadata = {
    title: "Reset Password | Luxury Real Estate",
    description: "Reset your luxury real estate account password.",
};

export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    return <ResetPasswordForm token={token} />;
}
