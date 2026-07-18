import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import Provider from "@/components/providers/provider";
import { display, sans, mono } from "@/public/fonts/font";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    colorScheme: "light",
    themeColor: "#ffffff",
};

export const metadata: Metadata = {
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
        <html
            lang="en"
            className={`${display.variable} ${sans.variable} ${mono.variable}`}
        >
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="bg-background text-text font-body antialiased">
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
