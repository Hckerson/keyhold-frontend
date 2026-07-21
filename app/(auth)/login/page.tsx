import Link from "next/link";
import { AuthHeading } from "@/components/features/auth/auth-heading";
import { LoginForm } from "@/components/features/auth/login-form";

export const metadata = {
    title: "Sign In | Luxury Real Estate",
    description: "Sign in to your luxury real estate account.",
};

export default function LoginPage() {
    return (
        <div className="space-y-8">
            <AuthHeading
                eyebrow="Member Access"
                title="Welcome back"
                subtitle="Sign in to your luxury real estate account"
            />

            <LoginForm />

            <p className="text-text-secondary text-sm">
                New to Luxury RE?{" "}
                <Link
                    href="/signup"
                    className="text-accent hover:text-accent-dark ease-smooth font-medium transition-colors"
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
}
