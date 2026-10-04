import { ADMIN_ROUTES } from "@/lib/constants";

export type ConsoleSkeletonVariant = "split" | "tiles" | "deck" | "review";

const DEFAULT_VARIANT: ConsoleSkeletonVariant = "split";

const ROUTE_VARIANTS: Record<string, ConsoleSkeletonVariant> = {
    [ADMIN_ROUTES.overview]: "deck",
    [ADMIN_ROUTES.listings]: "tiles",
    [ADMIN_ROUTES.verifications]: "review",
    [ADMIN_ROUTES.disputes]: "review",
    [ADMIN_ROUTES.flags]: "review",
};

export const consoleSkeletonFor = (pathname: string) =>
    ROUTE_VARIANTS[pathname] ?? DEFAULT_VARIANT;
