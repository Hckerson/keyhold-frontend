import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: { tsconfigPaths: true },
    test: {
        pool: "threads",
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        include: ["**/*.test.{ts,tsx}"],
        exclude: ["node_modules/**", ".next/**"],
        clearMocks: true,
        restoreMocks: true,
        testTimeout: 30_000,
    },
});
