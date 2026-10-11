import { describe, expect, it } from "vitest";
import { aMemberRecord } from "@/lib/data/__fixtures__/users";
import {
    rolesReading,
    userRoleOptions,
    userStatusTiles,
} from "@/lib/data/admin-users-totals";
import { toManagedUser } from "@/lib/utils/to-managed-user";
import type { User } from "@/lib/validations/user";

const anAccount = (overrides: Partial<User> = {}) =>
    toManagedUser(aMemberRecord(overrides));

const DIRECTORY = [
    anAccount({ id: "a", role: "SELLER" }),
    anAccount({ id: "b", role: "BUYER", status: "SUSPENDED" }),
    anAccount({ id: "c", role: "ADMIN" }),
    anAccount({ id: "d", role: "BUYER", status: "DELETED" }),
];

const tile = (id: string) =>
    userStatusTiles(DIRECTORY).find((entry) => entry.id === id);

describe("userStatusTiles", () => {
    it("counts every account under All, in full", () => {
        expect(tile("all")).toMatchObject({ count: 4, percent: 100 });
    });

    it("gives each status its count and its share of every account", () => {
        expect(tile("active")).toMatchObject({ count: 2, percent: 50 });
        expect(tile("suspended")).toMatchObject({ count: 1, percent: 25 });
        expect(tile("deleted")).toMatchObject({ count: 1, percent: 25 });
    });

    it("keeps a tile for a status nobody holds, at zero", () => {
        expect(tile("pending")).toMatchObject({ count: 0, percent: 0 });
    });

    it("shows zero shares rather than dividing by zero for an empty directory", () => {
        expect(userStatusTiles([]).map((entry) => entry.percent)).toEqual([
            100, 0, 0, 0, 0,
        ]);
    });
});

describe("userRoleOptions", () => {
    it("labels each role filter with how many accounts it holds", () => {
        expect(
            userRoleOptions(DIRECTORY).map((option) => option.label),
        ).toEqual(["All roles · 4", "Buyers · 2", "Agents · 1", "Admins · 1"]);
    });

    it("claims no count on any role filter before the directory has answered", () => {
        expect(userRoleOptions().map((option) => option.label)).toEqual([
            "All roles",
            "Buyers",
            "Agents",
            "Admins",
        ]);
    });
});

describe("rolesReading", () => {
    it("uses the singular for a role held by one account", () => {
        expect(rolesReading(DIRECTORY)).toBe("2 buyers · 1 agent · 1 admin");
    });
});
