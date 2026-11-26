import { Header } from "./header";
import { Footer } from "./footer";
import { SkipLink } from "@/components/layout/skip-link";
import { MAIN_CONTENT_ID } from "@/lib/constants";

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <SkipLink />
            <Header />
            <main id={MAIN_CONTENT_ID} className="w-full grow pt-[88px]">
                {children}
            </main>
            <Footer />
        </div>
    );
}
