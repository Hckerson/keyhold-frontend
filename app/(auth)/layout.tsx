import { Container } from "@/components/ui/container";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12">
            <Container size="sm" className="max-w-md">
                {children}
            </Container>
        </div>
    );
}
