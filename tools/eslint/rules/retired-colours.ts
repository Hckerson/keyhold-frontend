import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type Options = [];
type MessageIds = "retired";

const RETIRED = "highlight|success|warning|info|primary|metric";
const PROPERTIES =
    "text|bg|border|ring|fill|stroke|divide|outline|decoration|caret|shadow|from|to|via";

const CLASS_PATTERN = new RegExp(
    `(?<![\\w-])(?:[a-z-]+:)*(?:${PROPERTIES})-(?:${RETIRED})(?:-[a-z]+)?(?:/\\d+)?(?![\\w-])`,
);
const VARIABLE_PATTERN = new RegExp(`--colors?-(?:${RETIRED})\\b`);

const findRetired = (text: string) =>
    text.match(CLASS_PATTERN)?.[0] ?? text.match(VARIABLE_PATTERN)?.[0];

export const retiredColours = ESLintUtils.RuleCreator.withoutDocs<
    Options,
    MessageIds
>({
    meta: {
        type: "problem",
        docs: {
            description:
                "Forbid the colour tokens retired by ADR 0024 so the old palette cannot drift back.",
        },
        messages: {
            retired:
                "'{{token}}' is a retired colour (ADR 0024). Use paper, ink, forest (accent*) or brick (error*) instead.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        const check = (node: TSESTree.Node, text: string) => {
            const token = findRetired(text);
            if (token)
                context.report({ node, messageId: "retired", data: { token } });
        };

        return {
            Literal(node) {
                if (typeof node.value === "string") check(node, node.value);
            },
            TemplateElement(node) {
                check(node, node.value.raw);
            },
        };
    },
});
