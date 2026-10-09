import { ADMIN_ROUTES, AGENT_ROUTES, BUYER_ROUTES } from "@/lib/constants";

export type ConsoleSkeletonVariant =
    | "split"
    | "sixths"
    | "fifths"
    | "flow"
    | "lead"
    | "profile"
    | "deck"
    | "casework"
    | "board"
    | "quarters"
    | "thread"
    | "form"
    | "stack";

const DEFAULT_VARIANT: ConsoleSkeletonVariant = "split";

const ROUTE_VARIANTS: Record<string, ConsoleSkeletonVariant> = {
    [ADMIN_ROUTES.overview]: "deck",
    [ADMIN_ROUTES.listings]: "sixths",
    [ADMIN_ROUTES.users]: "fifths",
    [ADMIN_ROUTES.transactions]: "flow",
    [ADMIN_ROUTES.payments]: "lead",
    [ADMIN_ROUTES.verifications]: "casework",
    [ADMIN_ROUTES.disputes]: "casework",
    [ADMIN_ROUTES.flags]: "casework",
    [AGENT_ROUTES.pipeline]: "board",
    [AGENT_ROUTES.calendar]: "quarters",
    [AGENT_ROUTES.requests]: "stack",
    [BUYER_ROUTES.messages]: "thread",
};

const DETAIL_VARIANTS: Record<string, ConsoleSkeletonVariant> = {
    [ADMIN_ROUTES.users]: "profile",
    [AGENT_ROUTES.listings]: "form",
    [BUYER_ROUTES.offers]: "form",
};

const SECTION_DEPTH = 3;

const sectionOf = (pathname: string) =>
    pathname.split("/").slice(0, SECTION_DEPTH).join("/");

export const consoleSkeletonFor = (pathname: string) => {
    const section = sectionOf(pathname);
    return (
        ROUTE_VARIANTS[pathname] ??
        (section === pathname ? undefined : DETAIL_VARIANTS[section]) ??
        DEFAULT_VARIANT
    );
};
