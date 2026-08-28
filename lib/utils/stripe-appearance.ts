import type { Appearance } from "@stripe/stripe-js";

const TOKEN_VARIABLES = {
    colorPrimary: "--colors-accent",
    colorBackground: "--colors-background",
    colorText: "--colors-text",
    colorTextSecondary: "--colors-text-secondary",
    colorTextPlaceholder: "--colors-text-muted",
    colorDanger: "--colors-error",
    borderRadius: "--radii-md",
    fontFamily: "--fonts-body",
    fontSizeBase: "--font-sizes-xs",
    spacingUnit: "--spacing-1",
} as const;

export const stripeAppearance = (): Appearance => {
    if (typeof window === "undefined") return { theme: "stripe" };

    const styles = window.getComputedStyle(document.documentElement);
    const variables = Object.fromEntries(
        Object.entries(TOKEN_VARIABLES).map(([name, token]) => [
            name,
            styles.getPropertyValue(token).trim(),
        ]),
    );

    return { theme: "stripe", variables };
};
