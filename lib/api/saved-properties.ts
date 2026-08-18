import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { Property } from "@/lib/validations/property";

export interface SavedProperty {
    id: string;
    buyerId: string;
    propertyId: string;
    property: Property;
    createdAt: string;
}

export const savedPropertiesAPI = {
    list: () => query.get<SavedProperty[]>(config.api.savedProperties.list),

    ids: () => query.get<string[]>(config.api.savedProperties.ids),

    save: (propertyId: string) =>
        query.post<SavedProperty>(config.api.savedProperties.entry(propertyId)),

    unsave: (propertyId: string) =>
        query.delete<{ removed: boolean }>(
            config.api.savedProperties.entry(propertyId),
        ),
};
