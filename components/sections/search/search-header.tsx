interface SearchHeaderProps {
    location: string;
}

export function SearchHeader({ location }: SearchHeaderProps) {
    const query = location.trim();

    return (
        <header className="border-border-dark flex flex-col gap-1 border-b pb-4">
            <p className="micro-label">The collection</p>

            <h1 className="text-h5 font-display text-text font-light tracking-tight">
                {query ? (
                    <>
                        Residences in{" "}
                        <span className="text-accent">{query}</span>
                    </>
                ) : (
                    "Every residence"
                )}
            </h1>

            <p className="text-text-secondary max-w-[54ch] text-xs">
                Refine by location, price, layout and property type. Selections
                stay in the rail until you apply them.
            </p>
        </header>
    );
}

SearchHeader.displayName = "SearchHeader";
