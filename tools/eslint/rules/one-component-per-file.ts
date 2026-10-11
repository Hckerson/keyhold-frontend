import { ESLintUtils } from "@typescript-eslint/utils";
import { baseName, componentTracker, kebabCase } from "../ast";

type Options = [{ compound?: boolean }];
type MessageIds = "multipleComponents" | "filenameMismatch";

export const oneComponentPerFile = ESLintUtils.RuleCreator.withoutDocs<
    Options,
    MessageIds
>({
    meta: {
        type: "problem",
        docs: {
            description:
                "One component per file, in a kebab-case file named after the component.",
        },
        messages: {
            multipleComponents:
                "'{{name}}' is a second component in this file. Move it to '{{expected}}' and import it.",
            filenameMismatch:
                "Component '{{name}}' belongs in '{{expected}}', not '{{actual}}'.",
        },
        schema: [
            {
                type: "object",
                properties: { compound: { type: "boolean" } },
                additionalProperties: false,
            },
        ],
    },
    defaultOptions: [{ compound: false }],
    create(context, [{ compound }]) {
        const { primary, secondary, listeners } = componentTracker(
            context.filename,
        );

        return {
            ...listeners,
            "Program:exit"() {
                const component = primary();

                if (!component) return;

                const actual = baseName(context.filename);
                const isPart = (name: string) =>
                    compound && kebabCase(name).startsWith(`${actual}-`);
                const strays = secondary().filter(([name]) => !isPart(name));

                for (const [name, node] of strays) {
                    context.report({
                        node,
                        messageId: "multipleComponents",
                        data: { name, expected: `${kebabCase(name)}.tsx` },
                    });
                }

                const [name, node] = component;
                const expected = kebabCase(name);

                if (actual === expected || isPart(name)) return;

                context.report({
                    node,
                    messageId: "filenameMismatch",
                    data: {
                        name,
                        expected: `${expected}.tsx`,
                        actual: `${actual}.tsx`,
                    },
                });
            },
        };
    },
});
