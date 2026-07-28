export type UserRole = "ADMIN" | "BUYER" | "SELLER";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface AuthResponse {
    user: AuthUser;
    accessToken: string;
}

export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
}
