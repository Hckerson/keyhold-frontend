import { importSPKI, jwtVerify, type JWTPayload } from "jose";
import { USER_ROLES, type UserRole } from "@/lib/enums/enums";
import type { JwtPayload } from "@/lib/types/auth";

const ALGORITHM = "RS256";
const PEM_MARKER = "-----BEGIN";

const decodePem = (value: string) =>
    value.includes(PEM_MARKER) ? value : atob(value);

let importedKey: Promise<CryptoKey> | null = null;

const publicKey = () => {
    if (!importedKey) {
        const raw = process.env.JWT_PUBLIC_KEY;
        if (!raw) {
            throw new Error(
                "JWT_PUBLIC_KEY is not set — the proxy cannot verify a session",
            );
        }
        importedKey = importSPKI(decodePem(raw), ALGORITHM);
    }
    return importedKey;
};

const ROLES: ReadonlySet<string> = new Set(USER_ROLES);

const isUserRole = (value: unknown): value is UserRole =>
    typeof value === "string" && ROLES.has(value);

const toSession = (payload: JWTPayload): JwtPayload | null => {
    const { sub, email, role, iat, exp } = payload;

    if (typeof sub !== "string") return null;
    if (typeof email !== "string") return null;
    if (!isUserRole(role)) return null;
    if (typeof iat !== "number" || typeof exp !== "number") return null;

    return { sub, email, role, iat, exp };
};

export const verifySessionToken = async (
    token: string,
): Promise<JwtPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, await publicKey(), {
            algorithms: [ALGORITHM],
        });
        return toSession(payload);
    } catch {
        return null;
    }
};
