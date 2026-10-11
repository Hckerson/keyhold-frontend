import type { SignupInput } from "@/lib/validations/auth";
import type { StatusTone } from "./ui";

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

export type SignupRole = SignupInput["role"];

export type SignupFieldValues = Pick<
    SignupInput,
    "fullName" | "email" | "password" | "confirmPassword"
>;

export type AuthNoticeTone = Extract<StatusTone, "error" | "success" | "info">;

export interface AuthStep {
    current: number;
    total: number;
}

export interface AuthTitleBlockEntry {
    label: string;
    href: string;
    action: string;
}
