type QueryScalar = string | number | boolean;
type QueryValue = QueryScalar | readonly QueryScalar[] | undefined;

export const queryString = (query: Record<string, QueryValue> = {}): string => {
    const params = new URLSearchParams();

    for (const [name, value] of Object.entries(query)) {
        if (value === undefined) continue;
        const entries = typeof value === "object" ? value : [value];
        for (const entry of entries) params.append(name, String(entry));
    }

    const encoded = params.toString();
    return encoded ? `?${encoded}` : "";
};
