// @ts-check
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "dist/**",
            "build/**",
            "out/**",
            "eslint.config.mjs",
        ],
    },
    {
        plugins: {
            "unused-imports": unusedImports,
            react,
        },
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
            sourceType: "module",
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["*.mjs", "*.mts"],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        files: ["**/*.d.ts"],
        rules: {
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },
    {
        files: ["components/ui/**/*.tsx", "components/patterns/**/*.tsx"],
        rules: {
            "no-restricted-syntax": [
                "error",
                {
                    selector: "Literal[value=/(^| )(sm|md|lg|xl|2xl):[a-z]/]",
                    message:
                        "Primitives and patterns must not decide their own breakpoints. Promote the chain to a named scale class in styles/globals.css.",
                },
                {
                    selector:
                        "TemplateElement[value.raw=/(^| )(sm|md|lg|xl|2xl):[a-z]/]",
                    message:
                        "Primitives and patterns must not decide their own breakpoints. Promote the chain to a named scale class in styles/globals.css.",
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
