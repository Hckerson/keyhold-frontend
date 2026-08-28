import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateSavedSearchInput,
    SavedSearch,
    SavedSearchMatch,
    UpdateSavedSearchInput,
} from "@/lib/validations/saved-search";

export const savedSearchesAPI = {
    list: () => query.get<SavedSearch[]>(config.api.savedSearches.list),

    detail: (id: string) =>
        query.get<SavedSearch>(config.api.savedSearches.detail(id)),

    matches: (id: string) =>
        query.get<SavedSearchMatch[]>(config.api.savedSearches.matches(id)),

    create: (input: CreateSavedSearchInput) =>
        query.post<SavedSearch>(config.api.savedSearches.list, input),

    update: (id: string, input: UpdateSavedSearchInput) =>
        query.patch<SavedSearch>(config.api.savedSearches.detail(id), input),

    remove: (id: string) =>
        query.delete<SavedSearch>(config.api.savedSearches.detail(id)),
};
