import Link from "next/link";
import { propertiesServerAPI } from "@/lib/api/server";
import { toLocalityIndex } from "@/lib/data/localities";

const LOCALITY_SAMPLE = 200;
const HEADING = "Where we work";

export async function FooterLocalityIndex() {
    const page = await propertiesServerAPI.list({ limit: LOCALITY_SAMPLE });
    const localities = toLocalityIndex(page?.items ?? []);

    if (localities.length === 0) return null;

    const regions = [
        ...new Set(localities.map((locality) => locality.region)),
    ].filter(Boolean);

    return (
        <section
            aria-labelledby="footer-localities"
            className="border-sidebar-border relative z-10 border-b pb-6"
        >
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h2
                    id="footer-localities"
                    className="text-highlight font-mono text-[10px] tracking-[0.18em] uppercase"
                >
                    {HEADING}
                </h2>
                <span className="text-sidebar-text-muted font-mono text-[10px] tracking-[0.14em] uppercase tabular-nums">
                    {localities.length} localities · {regions.join(" · ")}
                </span>
            </div>

            <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4">
                {localities.map((locality) => (
                    <li key={`${locality.name}-${locality.region}`}>
                        <Link
                            href={`/search?q=${encodeURIComponent(locality.name)}`}
                            className="group border-sidebar-border focus-visible:ring-highlight flex items-baseline justify-between gap-3 border-b py-2.5 focus-visible:ring-2 focus-visible:outline-none"
                        >
                            <span className="text-sidebar-text group-hover:text-sidebar-text-active ease-smooth truncate text-xs transition-colors duration-200">
                                {locality.name}
                            </span>
                            <span className="text-sidebar-text-muted group-hover:text-highlight ease-smooth shrink-0 font-mono text-[10px] tabular-nums transition-colors duration-200">
                                {locality.count}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

FooterLocalityIndex.displayName = "FooterLocalityIndex";
