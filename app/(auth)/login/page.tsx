import { LoginForm } from "@/components/features/auth/login-form";

export const metadata = {
    title: "Sign In | Luxury Real Estate",
    description: "Sign in to your luxury real estate account.",
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>;
}) {
    const { redirect } = await searchParams;

    return <LoginForm redirectTo={redirect} />;
}
