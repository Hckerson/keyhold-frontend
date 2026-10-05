import {
    AST_NODE_TYPES,
    ESLintUtils,
    TSESTree,
} from "@typescript-eslint/utils";
import { baseName, kebabCase } from "../ast";

type Options = [];
type MessageIds = "exportedType";

const TYPE_DECLARATIONS = [
    AST_NODE_TYPES.TSTypeAliasDeclaration,
    AST_NODE_TYPES.TSInterfaceDeclaration,
    AST_NODE_TYPES.TSEnumDeclaration,
];

const exportedName = (node: TSESTree.ExportNamedDeclaration): string => {
    const declaration = node.declaration;

    if (declaration && "id" in declaration && declaration.id) {
        return declaration.id.type === AST_NODE_TYPES.Identifier
            ? declaration.id.name
            : "this type";
    }

    return node.specifiers
        .map((specifier) =>
            specifier.local.type === AST_NODE_TYPES.Identifier
                ? specifier.local.name
                : specifier.local.value,
        )
        .join(", ");
};

const PROPS_SUFFIX = "Props";

const isOwnProps = (name: string, filename: string): boolean =>
    name.endsWith(PROPS_SUFFIX) &&
    kebabCase(name.slice(0, -PROPS_SUFFIX.length)) === baseName(filename);

export const domainTypesInLib = ESLintUtils.RuleCreator.withoutDocs<
    Options,
    MessageIds
>({
    meta: {
        type: "problem",
        docs: {
            description:
                "Keep shared domain types in lib/types; view files import them rather than export them.",
        },
        messages: {
            exportedType:
                "'{{name}}' is exported from a view file. Shared types live in lib/types/<domain>.ts and re-export from lib/types/index.ts.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            ExportNamedDeclaration(node) {
                const declaresType =
                    node.declaration !== null &&
                    TYPE_DECLARATIONS.includes(node.declaration.type);

                if (node.source) return;
                if (node.exportKind !== "type" && !declaresType) return;

                const name = exportedName(node);

                if (isOwnProps(name, context.filename)) return;

                context.report({
                    node,
                    messageId: "exportedType",
                    data: { name },
                });
            },
        };
    },
});
