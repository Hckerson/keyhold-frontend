import "@/styles/globals.css";
import { config } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import Provider from "@/components/providers/provider";
import { RootDocument } from "@/components/layout/root-document";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    colorScheme: "light",
    themeColor: "#ffffff",
};

export const metadata: Metadata = {
    metadataBase: new URL(config.site.url),
    title: "Luxury Real Estate Marketplace | Premium Properties & Concierge",
    description:
        "Discover exclusive luxury properties with white-glove concierge service. Premium marketplace for high-net-worth buyers and luxury agents.",
    keywords: [
        "luxury real estate",
        "premium properties",
        "concierge service",
        "exclusive listings",
        "high-net-worth",
    ],

    openGraph: {
        title: "Luxury Real Estate Marketplace",
        description:
            "Discover exclusive luxury properties with white-glove concierge service.",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RootDocument>
            <Provider>{children}</Provider>
        </RootDocument>
    );
}
