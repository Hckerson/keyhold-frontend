import { config } from "@/lib/constants";
import type { ListingDto } from "@/lib/validations/listing";

export const listingsAPI = {
    async search(query: Record<string, unknown>) {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            if (
                typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "boolean"
            ) {
                params.append(key, String(value));
            }
        });

        const response = await fetch(
            `${config.api.base}/api/listings?${params}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            },
        );

        if (!response.ok) throw new Error("Failed to fetch listings");
        return response.json() as Promise<{ listings: ListingDto[] }>;
    },

    async getById(id: string) {
        const response = await fetch(`${config.api.base}/api/listings/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch listing");
        return response.json() as Promise<ListingDto>;
    },

    async create(data: Record<string, unknown>) {
        const response = await fetch(`${config.api.base}/api/listings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to create listing");
        return response.json() as Promise<ListingDto>;
    },

    async update(id: string, data: Partial<ListingDto>) {
        const response = await fetch(`${config.api.base}/api/listings/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to update listing");
        return response.json() as Promise<ListingDto>;
    },

    async delete(id: string) {
        const response = await fetch(`${config.api.base}/api/listings/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete listing");
        return response.json() as Promise<{ success: boolean }>;
    },
};
