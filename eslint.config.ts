import globals from "globals";
import eslint from "@eslint/js";
import tseslint, { type ConfigArray } from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import { version as reactVersion } from "react";
import { starter } from "./tools/eslint";

const TRANSPORT_MODULE = "@/lib/api/client";
const MAX_FILE_LINES = 150;
const ADOPTING = "warn";

const GENERATED = "lib/contract/**";
const VIEWS = ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"];
const SOURCE = [...VIEWS, "lib/**/*.{ts,tsx}"];
const RESOURCE_LAYER = ["lib/api/**"];
const ROUTES = ["app/**/page.tsx"];
const COMPONENTS = ["components/**/*.tsx"];
const TESTS = ["**/*.test.{ts,tsx}"];
const LENGTH_EXEMPT = ["lib/enums/enums.ts"];
const EDITORIAL = [
    "app/(public)/**",
    "app/(auth)/**",
    "components/sections/home/**",
    "components/sections/listing/**",
    "components/sections/search/**",
    "components/sections/site/**",
    "components/features/auth/**",
    "components/layout/**",
];
const BREAKPOINT_OWNERS = [
    "components/ui/**/*.tsx",
    "components/patterns/**/*.tsx",
];
const BREAKPOINT_MESSAGE =
    "Primitives and patterns must not decide their own breakpoints. Promote the chain to a named scale class in styles/globals.css.";

type RestrictedPath = { name: string; message: string };

type RestrictedImports = [
    "error",
    {
        paths: RestrictedPath[];
        patterns: { group: string[]; message: string }[];
    },
];

const ID_SOURCE = "IDs come from nanoid — never uuid or Date.now().";

const restrictedImports = (...paths: RestrictedPath[]): RestrictedImports => [
    "error",
    {
        paths: [{ name: "uuid", message: ID_SOURCE }, ...paths],
        patterns: [
            {
                group: ["../*", "../**"],
                message:
                    "Import through the '@/' alias. Deep-relative paths break when a file moves.",
            },
        ],
    },
];

const projectConfig: ConfigArray = tseslint.config(
    {
        plugins: { "unused-imports": unusedImports },
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            globals: { ...globals.node, ...globals.browser },
            sourceType: "module",
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["*.mjs", "*.mts"],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: { react: { version: reactVersion } },
    },
    {
        files: ["**/*.d.ts"],
        rules: { "@typescript-eslint/no-empty-object-type": "off" },
    },
    {
        files: BREAKPOINT_OWNERS,
        rules: {
            "no-restricted-syntax": [
                "error",
                {
                    selector: "Literal[value=/(^| )(sm|md|lg|xl|2xl):[a-z]/]",
                    message: BREAKPOINT_MESSAGE,
                },
                {
                    selector:
                        "TemplateElement[value.raw=/(^| )(sm|md|lg|xl|2xl):[a-z]/]",
                    message: BREAKPOINT_MESSAGE,
                },
            ],
        },
    },
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-argument": "error",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-unsafe-enum-comparison": "off",
        },
    },
);

const starterConfig: ConfigArray = [
    {
        plugins: { starter },
    },
    {
        rules: { "starter/no-comments": "error" },
    },
    {
        files: SOURCE,
        rules: {
            "no-restricted-imports": restrictedImports(),
            "max-lines": [
                ADOPTING,
                {
                    max: MAX_FILE_LINES,
                    skipBlankLines: false,
                    skipComments: false,
                },
            ],
            "no-console": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "no-restricted-properties": [
                ADOPTING,
                { object: "Date", property: "now", message: ID_SOURCE },
            ],
        },
    },
    {
        files: SOURCE,
        ignores: RESOURCE_LAYER,
        rules: {
            "starter/api-access-boundary": [
                "error",
                { clientModules: [TRANSPORT_MODULE], hooksDir: "lib/hooks" },
            ],
        },
    },
    {
        files: VIEWS,
        rules: {
            "starter/application-register-density": ADOPTING,
            "starter/domain-types-in-lib": ADOPTING,
            "starter/token-first-classnames": ADOPTING,
            "no-restricted-imports": restrictedImports({
                name: TRANSPORT_MODULE,
                message:
                    "Components consume hooks. Import a use-<resource> hook from @/lib/hooks instead.",
            }),
        },
    },
    {
        files: EDITORIAL,
        rules: { "starter/application-register-density": "off" },
    },
    {
        files: COMPONENTS,
        rules: { "starter/one-component-per-file": ADOPTING },
    },
    {
        files: ROUTES,
        rules: { "starter/page-composes-only": ADOPTING },
    },
    {
        files: [...TESTS, ...LENGTH_EXEMPT],
        rules: { "max-lines": "off" },
    },
];

const eslintConfig = [
    ...defineConfig([
        ...nextVitals,
        ...nextTs,
        globalIgnores([
            ".next/**",
            "node_modules/**",
            "dist/**",
            "build/**",
            "out/**",
            "next-env.d.ts",
            GENERATED,
        ]),
    ]),
    ...projectConfig,
    ...starterConfig,
];

export default eslintConfig;
