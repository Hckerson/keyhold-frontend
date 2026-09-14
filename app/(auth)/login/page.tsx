import { LoginForm } from "@/components/features/auth/login-form";
import { oauthFailureFrom } from "@/lib/config/auth-recovery";

export const metadata = {
    title: "Sign In | Luxury Real Estate",
    description: "Sign in to your luxury real estate account.",
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{
        redirect?: string;
        expired?: string;
        oauth?: string;
    }>;
}) {
    const { redirect, expired, oauth } = await searchParams;

    return (
        <LoginForm
            redirectTo={redirect}
            expired={Boolean(expired)}
            oauthFailure={oauthFailureFrom(oauth)}
        />
    );
}
