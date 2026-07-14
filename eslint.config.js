import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import unusedImportsPlugin from "eslint-plugin-unused-imports";

export default [
    js.configs.recommended,
    ...tseslint.configs.strict,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            react: reactPlugin,
            "unused-imports": unusedImportsPlugin,
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/display-name": "off",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: true,
                },
            ],
            "no-console": [
                "warn",
                {
                    allow: ["warn", "error"],
                },
            ],
        },
    },
    {
        ignores: [
            "node_modules",
            ".next",
            "dist",
            "build",
            "coverage",
            ".vscode",
        ],
    },
];
