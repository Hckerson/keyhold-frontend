import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { AuthResponse } from "@/lib/types/auth";
import type {
    LoginInput,
    NewPasswordInput,
    ResetPasswordInput,
    SignupInput,
} from "@/lib/validations/auth";

export const authAPI = {
    login: (input: LoginInput & { remember?: boolean }) =>
        query.post<AuthResponse>(config.api.auth.login, input),

    register: (input: Omit<SignupInput, "confirmPassword" | "acceptedTerms">) =>
        query.post<AuthResponse>(config.api.auth.register, input),

    forgotPassword: (input: ResetPasswordInput) =>
        query.post<{ message: string }>(config.api.auth.forgotPassword, input),

    resetPassword: (input: NewPasswordInput & { token: string }) =>
        query.post<{ message: string }>(config.api.auth.resetPassword, {
            token: input.token,
            password: input.password,
        }),
};
