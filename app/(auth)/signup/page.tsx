import { SignupForm } from "@/components/features/auth/signup-form";

export const metadata = {
    title: "Begin your application | Luxury Real Estate",
    description:
        "Apply for access to the marketplace — as a buyer seeking a residence, or an agent presenting one.",
};

export default async function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>;
}) {
    const { redirect } = await searchParams;

    return <SignupForm redirectTo={redirect} />;
}
