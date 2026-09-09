import { describe, expect, it } from "vitest";
import {
    MIRRORED_ENUMS,
    compareEnums,
    formatDrift,
    parseMirrorArrays,
    parsePrismaEnums,
} from "./enum-parity.mts";

const PAIRS = { PROPERTY_TYPES: "PropertyType" };

const driftOf = (schema: string, mirror: string) =>
    compareEnums(parsePrismaEnums(schema), parseMirrorArrays(mirror), PAIRS);

describe("parsePrismaEnums", () => {
    it("reads every member of an enum block and drops trailing comments", () => {
        const enums = parsePrismaEnums(
            `enum PropertyType {\n  ESTATE\n  VILLA // the good one\n}\n`,
        );

        expect(enums.get("PropertyType")).toEqual(["ESTATE", "VILLA"]);
    });

    it("keeps enum blocks separate when the schema declares several", () => {
        const enums = parsePrismaEnums(
            `enum PropertyType {\n  ESTATE\n}\n\nenum OfferStatus {\n  DRAFT\n}\n`,
        );

        expect([...enums.keys()]).toEqual(["PropertyType", "OfferStatus"]);
    });
});

describe("parseMirrorArrays", () => {
    it("reads the string members of an as-const array", () => {
        const arrays = parseMirrorArrays(
            `export const PROPERTY_TYPES = [\n    "ESTATE",\n    "VILLA",\n] as const;\n`,
        );

        expect(arrays.get("PROPERTY_TYPES")).toEqual(["ESTATE", "VILLA"]);
    });

    it("ignores an export that is not an as-const array", () => {
        const arrays = parseMirrorArrays(
            `export const PROPERTY_TYPE_LABELS = { ESTATE: "Estate" };\n`,
        );

        expect(arrays.size).toBe(0);
    });
});

describe("compareEnums", () => {
    it("stays silent when the mirror carries every schema member", () => {
        expect(
            driftOf(
                `enum PropertyType {\n  ESTATE\n  VILLA\n}\n`,
                `export const PROPERTY_TYPES = ["ESTATE", "VILLA"] as const;\n`,
            ),
        ).toEqual([]);
    });

    it("catches a member the schema added and the mirror never gained", () => {
        expect(
            driftOf(
                `enum PropertyType {\n  ESTATE\n  VILLA\n}\n`,
                `export const PROPERTY_TYPES = ["ESTATE"] as const;\n`,
            ),
        ).toEqual([
            {
                array: "PROPERTY_TYPES",
                enumName: "PropertyType",
                absent: null,
                mirrorOnly: [],
                schemaOnly: ["VILLA"],
            },
        ]);
    });

    it("catches a member the mirror invented and the schema does not have", () => {
        expect(
            driftOf(
                `enum PropertyType {\n  ESTATE\n}\n`,
                `export const PROPERTY_TYPES = ["ESTATE", "CASTLE"] as const;\n`,
            )[0]?.mirrorOnly,
        ).toEqual(["CASTLE"]);
    });

    it("catches a mapped array the mirror does not declare at all", () => {
        expect(
            driftOf(`enum PropertyType {\n  ESTATE\n}\n`, ``)[0]?.absent,
        ).toBe("array");
    });

    it("catches a mapped enum the schema does not declare at all", () => {
        expect(
            driftOf(
                ``,
                `export const PROPERTY_TYPES = ["ESTATE"] as const;\n`,
            )[0]?.absent,
        ).toBe("enum");
    });

    it("ignores an array that is not mapped to a schema enum", () => {
        expect(
            driftOf(
                `enum PropertyType {\n  ESTATE\n}\n`,
                `export const PROPERTY_TYPES = ["ESTATE"] as const;\nexport const PROPERTY_SORTS = ["newest"] as const;\n`,
            ),
        ).toEqual([]);
    });

    it("defaults to the mapping the gate actually ships", () => {
        expect(Object.keys(MIRRORED_ENUMS).length).toBeGreaterThan(0);
        expect(
            compareEnums(new Map(), new Map()).map((drift) => drift.array),
        ).toEqual(Object.keys(MIRRORED_ENUMS));
    });
});

describe("formatDrift", () => {
    it("names the missing members on the side that lacks them", () => {
        const message = formatDrift(
            driftOf(
                `enum PropertyType {\n  ESTATE\n  VILLA\n}\n`,
                `export const PROPERTY_TYPES = ["ESTATE"] as const;\n`,
            ),
        );

        expect(message).toContain("PROPERTY_TYPES <-> enum PropertyType");
        expect(message).toContain("absent from the mirror: VILLA");
    });
});
