import { MIN_PASSWORD_LENGTH } from "@/lib/validations/auth";

export const PASSWORD_STRENGTH_MAX = 100;

interface PasswordRule {
    id: string;
    label: string;
    weight: number;
    holds: (password: string) => boolean;
}

export const PASSWORD_RULES: readonly PasswordRule[] = [
    {
        id: "length",
        label: `${MIN_PASSWORD_LENGTH} characters or more`,
        weight: 30,
        holds: (password) => password.length >= MIN_PASSWORD_LENGTH,
    },
    {
        id: "long",
        label: "12 characters or more",
        weight: 15,
        holds: (password) => password.length >= 12,
    },
    {
        id: "mixed-case",
        label: "Upper and lower case",
        weight: 20,
        holds: (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
        id: "digit",
        label: "A number",
        weight: 15,
        holds: (password) => /\d/.test(password),
    },
    {
        id: "symbol",
        label: "A symbol",
        weight: 20,
        holds: (password) => /[^A-Za-z0-9]/.test(password),
    },
];

export const passwordStrength = (password: string) =>
    password === ""
        ? 0
        : PASSWORD_RULES.reduce(
              (score, rule) =>
                  rule.holds(password) ? score + rule.weight : score,
              0,
          );

export const unmetPasswordRule = (password: string) =>
    PASSWORD_RULES.find((rule) => !rule.holds(password))?.label;

export const PASSWORD_STRENGTH_LABELS: { floor: number; label: string }[] = [
    { floor: 90, label: "Excellent" },
    { floor: 70, label: "Strong" },
    { floor: 50, label: "Fair" },
    { floor: 1, label: "Weak" },
];

export const passwordStrengthLabel = (score: number) =>
    PASSWORD_STRENGTH_LABELS.find((band) => score >= band.floor)?.label ?? "";
