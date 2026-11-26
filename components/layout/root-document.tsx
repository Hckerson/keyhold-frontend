import type { ReactNode } from "react";
import { display, sans, mono } from "@/public/fonts/font";

export function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className={`${display.variable} ${sans.variable} ${mono.variable}`}
        >
            <body className="bg-background text-text font-body antialiased">
                {children}
            </body>
        </html>
    );
}

RootDocument.displayName = "RootDocument";
