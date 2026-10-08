import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "vitest";
import { retiredColours } from "./retired-colours";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

ruleTester.run("retired-colours", retiredColours, {
    valid: [
        {
            name: "classes from the four colour roles",
            code: `const cls = "bg-accent-light text-accent border-error/30 text-text-muted";`,
        },
        {
            name: "a semantic status name that is not a class",
            code: `const tone = "success";`,
        },
        {
            name: "a word that only contains a retired name",
            code: `const label = "information highlights";`,
        },
    ],
    invalid: [
        {
            name: "a brass text class",
            code: `const cls = "text-highlight-dark font-medium";`,
            errors: [{ messageId: "retired" }],
        },
        {
            name: "a second-green fill behind a variant prefix",
            code: `const cls = "hover:bg-success/10";`,
            errors: [{ messageId: "retired" }],
        },
        {
            name: "an amber class inside a JSX attribute",
            code: `const el = <span className="text-warning" />;`,
            errors: [{ messageId: "retired" }],
        },
        {
            name: "a slate class inside a template literal",
            code: "const cls = `border ${size} border-info/20`;",
            errors: [{ messageId: "retired" }],
        },
        {
            name: "a raw custom property for a retired hue",
            code: `const style = { color: "var(--color-highlight)" };`,
            errors: [{ messageId: "retired" }],
        },
    ],
});
