import { existsSync, readFileSync } from "node:fs";
import {
    MIRRORED_ENUMS,
    compareEnums,
    formatDrift,
    parseMirrorArrays,
    parsePrismaEnums,
} from "./enum-parity.mts";

const SCHEMA = process.env.PRISMA_SCHEMA ?? "../backend/prisma/schema.prisma";
const MIRROR = "lib/enums/enums.ts";

if (!existsSync(SCHEMA)) {
    process.stdout.write(`${SCHEMA} not found - enum parity check skipped\n`);
    process.exit(0);
}

const drifts = compareEnums(
    parsePrismaEnums(readFileSync(SCHEMA, "utf8")),
    parseMirrorArrays(readFileSync(MIRROR, "utf8")),
);

if (drifts.length === 0) {
    process.stdout.write(
        `${MIRROR}: ${Object.keys(MIRRORED_ENUMS).length} enums match ${SCHEMA}\n`,
    );
    process.exit(0);
}

process.stderr.write(
    `${MIRROR} has drifted from ${SCHEMA}:\n${formatDrift(drifts)}\nupdate ${MIRROR} to match the schema, or drop the pair from MIRRORED_ENUMS in tools/enum-parity.mts\n`,
);
process.exit(1);
