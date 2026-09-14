export const MIRRORED_ENUMS = {
    PROPERTY_TYPES: "PropertyType",
    PROPERTY_STATUSES: "PropertyStatus",
    CONNECTION_STATUSES: "ConnectionStatus",
    CONTACT_CHANNELS: "ContactChannel",
    CONTACT_DIRECTIONS: "ContactDirection",
    CONTACT_STATUSES: "ContactStatus",
    VIEWING_MODES: "ViewingMode",
    VIEWING_STATUSES: "ViewingStatus",
    OFFER_STATUSES: "OfferStatus",
    TRANSACTION_STATUSES: "TransactionStatus",
    USER_ROLES: "UserRole",
    USER_ACCOUNT_STATUSES: "UserAccountStatus",
    FLAG_TYPES: "FlagType",
    FLAG_STATUSES: "FlagStatus",
    VERIFICATION_STATUSES: "VerificationStatus",
    DISPUTE_STATUSES: "DisputeStatus",
    DISPUTE_EVIDENCE_TYPES: "DisputeEvidenceType",
    ESCROW_STATUSES: "EscrowStatus",
    CONTINGENCIES: "Contingency",
    MILESTONE_KINDS: "MilestoneKind",
    MILESTONE_STATUSES: "MilestoneStatus",
    NOTIFICATION_TYPES: "NotificationType",
    NOTIFICATION_CHANNELS: "NotificationChannel",
    SETTING_CATEGORIES: "SettingCategory",
    AUDIT_ACTION_TYPES: "AuditActionType",
    USER_TIERS: "UserTier",
    CONCIERGE_TIERS: "ConciergeTier",
    CONCIERGE_STATUSES: "ConciergeStatus",
    CONCIERGE_REQUEST_STATUSES: "ConciergeRequestStatus",
    SERVICE_COMPONENTS: "ServiceComponent",
} as const;

export type MirroredArray = keyof typeof MIRRORED_ENUMS;

export interface EnumDrift {
    array: string;
    enumName: string;
    absent: "array" | "enum" | null;
    mirrorOnly: string[];
    schemaOnly: string[];
}

const ENUM_BLOCK = /^enum\s+(\w+)\s*\{([^}]*)\}/gm;
const ARRAY_BLOCK = /^export const ([A-Z0-9_]+) = \[([^\]]*)\] as const;/gm;
const QUOTED = /"([^"]*)"/g;

export const parsePrismaEnums = (source: string): Map<string, string[]> =>
    new Map(
        [...source.matchAll(ENUM_BLOCK)].map(([, name, body]) => [
            name,
            body
                .split("\n")
                .map((line) => line.replace(/\/\/.*$/, "").trim())
                .filter(Boolean),
        ]),
    );

export const parseMirrorArrays = (source: string): Map<string, string[]> =>
    new Map(
        [...source.matchAll(ARRAY_BLOCK)].map(([, name, body]) => [
            name,
            [...body.matchAll(QUOTED)].map(([, member]) => member),
        ]),
    );

export const compareEnums = (
    schema: Map<string, string[]>,
    mirror: Map<string, string[]>,
    pairs: Record<string, string> = MIRRORED_ENUMS,
): EnumDrift[] =>
    Object.entries(pairs).flatMap(([array, enumName]): EnumDrift[] => {
        const members = mirror.get(array);
        const literals = schema.get(enumName);

        if (!members || !literals) {
            return [
                {
                    array,
                    enumName,
                    absent: members ? "enum" : "array",
                    mirrorOnly: [],
                    schemaOnly: [],
                },
            ];
        }

        const mirrorOnly = members.filter((m) => !literals.includes(m));
        const schemaOnly = literals.filter((l) => !members.includes(l));

        return mirrorOnly.length === 0 && schemaOnly.length === 0
            ? []
            : [{ array, enumName, absent: null, mirrorOnly, schemaOnly }];
    });

export const formatDrift = (drifts: EnumDrift[]): string =>
    drifts
        .map(({ array, enumName, absent, mirrorOnly, schemaOnly }) => {
            if (absent === "array")
                return `  ${array} is missing from the mirror (schema has enum ${enumName})`;
            if (absent === "enum")
                return `  enum ${enumName} is missing from the schema (mirror has ${array})`;

            const lines = [`  ${array} <-> enum ${enumName}`];
            if (schemaOnly.length)
                lines.push(
                    `      absent from the mirror: ${schemaOnly.join(", ")}`,
                );
            if (mirrorOnly.length)
                lines.push(
                    `      absent from the schema: ${mirrorOnly.join(", ")}`,
                );
            return lines.join("\n");
        })
        .join("\n");
