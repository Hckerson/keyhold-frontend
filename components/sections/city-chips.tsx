import Link from "next/link";

const CITIES = [
    "Beverly Hills",
    "Malibu",
    "Bel Air",
    "Santa Monica",
    "Pacific Heights",
];

export function CityChips({ cities = CITIES }: { cities?: string[] }) {
    return (
        <div className="mt-6 flex flex-wrap gap-2">
            {cities.map((city) => (
                <Link
                    key={city}
                    href={`/search?q=${encodeURIComponent(city)}`}
                    className="border-border-dark text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-light ease-smooth rounded-full border px-4 py-1.5 text-xs transition-all"
                >
                    {city}
                </Link>
            ))}
        </div>
    );
}

CityChips.displayName = "CityChips";
