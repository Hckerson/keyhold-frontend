export interface PersonalDataExport {
    exportedAt: string;
    profile: Record<string, unknown>;
    savedProperties: unknown[];
    savedSearches: unknown[];
    connections: unknown[];
    messages: unknown[];
    viewings: unknown[];
    offers: unknown[];
    transactions: unknown[];
    reviewsWritten: unknown[];
    reviewsReceived: unknown[];
    identityDocuments: unknown[];
    notificationPreferences: unknown[];
    notifications: unknown[];
}
