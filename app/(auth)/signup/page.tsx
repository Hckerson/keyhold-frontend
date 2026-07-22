import Link from "next/link";
import { AuthHeading } from "@/components/features/auth/auth-heading";
import { SignupForm } from "@/components/features/auth/signup-form";

export const metadata = {
    title: "Create Account | Luxury Real Estate",
    description: "Join the premium real estate marketplace.",
};

export default function SignupPage() {
    return (
        <div className="space-y-8">
            <AuthHeading
                eyebrow="Get Started"
                title="Create your account"
                subtitle="Join the premium real estate marketplace"
            />

            <SignupForm />

            <p className="text-text-secondary text-center text-[12px]">
                Already have an account?{" "}
                <Link href="/login" className="text-accent font-medium">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
