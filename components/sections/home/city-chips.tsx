import Link from "next/link";
import { PUBLIC_ROUTES } from "@/lib/constants";

export function CityChips({ cities }: { cities: string[] }) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-text-muted mr-1 font-mono text-[10px] tracking-[0.14em] uppercase">
                Popular
            </span>
            {cities.map((city) => (
                <Link
                    key={city}
                    href={`${PUBLIC_ROUTES.search}?q=${encodeURIComponent(city)}`}
                    className="border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-light focus-visible:ring-accent ease-smooth rounded-full border px-3 py-1 text-[11px] transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    {city}
                </Link>
            ))}
        </div>
    );
}

CityChips.displayName = "CityChips";
