import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--color-primary)",
                    dark: "var(--color-primary-dark)",
                    light: "var(--color-primary-light)",
                },
                accent: {
                    DEFAULT: "var(--color-accent)",
                    dark: "var(--color-accent-dark)",
                    light: "var(--color-accent-light)",
                },
                success: {
                    DEFAULT: "var(--color-success)",
                    light: "var(--color-success-light)",
                },
                warning: {
                    DEFAULT: "var(--color-warning)",
                    light: "var(--color-warning-light)",
                },
                error: {
                    DEFAULT: "var(--color-error)",
                    light: "var(--color-error-light)",
                },
                info: {
                    DEFAULT: "var(--color-info)",
                    light: "var(--color-info-light)",
                },
            },
            backgroundColor: {
                base: "var(--color-background)",
                alt: "var(--color-background-alt)",
                muted: "var(--color-background-muted)",
            },
            textColor: {
                text: "var(--color-text)",
                primary: "var(--color-text)",
                secondary: "var(--color-text-secondary)",
                muted: "var(--color-text-muted)",
            },
            borderColor: {
                DEFAULT: "var(--color-border)",
                light: "var(--color-border-light)",
                dark: "var(--color-border-dark)",
            },
            fontSize: {
                h1: [
                    "var(--text-h1)",
                    {
                        lineHeight: "var(--text-h1-line)",
                        fontWeight: "var(--text-h1-weight)",
                    },
                ],
                h2: [
                    "var(--text-h2)",
                    {
                        lineHeight: "var(--text-h2-line)",
                        fontWeight: "var(--text-h2-weight)",
                    },
                ],
                h3: [
                    "var(--text-h3)",
                    {
                        lineHeight: "var(--text-h3-line)",
                        fontWeight: "var(--text-h3-weight)",
                    },
                ],
                h4: [
                    "var(--text-h4)",
                    {
                        lineHeight: "var(--text-h4-line)",
                        fontWeight: "var(--text-h4-weight)",
                    },
                ],
                h5: [
                    "var(--text-h5)",
                    {
                        lineHeight: "var(--text-h5-line)",
                        fontWeight: "var(--text-h5-weight)",
                    },
                ],
                h6: [
                    "var(--text-h6)",
                    {
                        lineHeight: "var(--text-h6-line)",
                        fontWeight: "var(--text-h6-weight)",
                    },
                ],
                lg: [
                    "var(--text-lg)",
                    {
                        lineHeight: "var(--text-lg-line)",
                        fontWeight: "var(--text-lg-weight)",
                    },
                ],
                base: [
                    "var(--text-base)",
                    {
                        lineHeight: "var(--text-base-line)",
                        fontWeight: "var(--text-base-weight)",
                    },
                ],
                sm: [
                    "var(--text-sm)",
                    {
                        lineHeight: "var(--text-sm-line)",
                        fontWeight: "var(--text-sm-weight)",
                    },
                ],
                xs: [
                    "var(--text-xs)",
                    {
                        lineHeight: "var(--text-xs-line)",
                        fontWeight: "var(--text-xs-weight)",
                    },
                ],
            },
            spacing: {
                0: "var(--space-0)",
                1: "var(--space-1)",
                2: "var(--space-2)",
                3: "var(--space-3)",
                4: "var(--space-4)",
                5: "var(--space-5)",
                6: "var(--space-6)",
                8: "var(--space-8)",
                10: "var(--space-10)",
                12: "var(--space-12)",
                16: "var(--space-16)",
                20: "var(--space-20)",
                24: "var(--space-24)",
                32: "var(--space-32)",
            },
            gap: {
                xs: "var(--gap-xs)",
                sm: "var(--gap-sm)",
                md: "var(--gap-md)",
                lg: "var(--gap-lg)",
                xl: "var(--gap-xl)",
            },
            padding: {
                xs: "var(--pad-xs)",
                sm: "var(--pad-sm)",
                md: "var(--pad-md)",
                lg: "var(--pad-lg)",
                xl: "var(--pad-xl)",
                "2xl": "var(--pad-2xl)",
            },
            transitionDuration: {
                fast: "var(--motion-fast)",
                normal: "var(--motion-normal)",
                slow: "var(--motion-slow)",
                slower: "var(--motion-slower)",
            },
            transitionTimingFunction: {
                in: "var(--ease-in)",
                out: "var(--ease-out)",
                "in-out": "var(--ease-in-out)",
                smooth: "var(--ease-smooth)",
            },
            boxShadow: {
                sm: "var(--shadow-sm)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)",
                xl: "var(--shadow-xl)",
                "2xl": "var(--shadow-2xl)",
            },
            borderRadius: {
                xs: "var(--radius-xs)",
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },
            fontFamily: {
                display: ["'Merriweather'", "'Instrument Serif'", "serif"],
                body: [
                    "'Space Grotesk'",
                    "'Inter'",
                    ...defaultTheme.fontFamily.sans,
                ],
                mono: ["'JetBrains Mono'", "'Monaco'", "monospace"],
            },
            screens: {
                xs: "var(--breakpoint-xs)",
                sm: "var(--breakpoint-sm)",
                md: "var(--breakpoint-md)",
                lg: "var(--breakpoint-lg)",
                xl: "var(--breakpoint-xl)",
            },
        },
    },
    plugins: [],
};

export default config;
