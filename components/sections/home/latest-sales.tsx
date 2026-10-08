import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { MapView } from "@/components/ui/map-view";
import { SaleCard } from "@/components/sections/home/sale-card";
import type { MapPin } from "@/lib/config/map";
import type { LatestSaleData } from "@/lib/types";

interface LatestSalesProps {
    sales: LatestSaleData[];
}

const SALES_MAP_LABEL = "Recent sales across the neighbourhoods we cover";

const toSalePins = (sales: LatestSaleData[]): MapPin[] =>
    sales.flatMap((sale) =>
        sale.latitude === null || sale.longitude === null
            ? []
            : [
                  {
                      id: sale.id,
                      latitude: sale.latitude,
                      longitude: sale.longitude,
                      label: sale.address,
                      caption: `${sale.price} · ${sale.soldLabel}`,
                      tone: "accent" as const,
                      href: PUBLIC_ROUTES.listing(sale.id),
                  },
              ],
    );

export function LatestSales({ sales }: LatestSalesProps) {
    return (
        <section className="section-pady bg-background-alt">
            <SectionShell>
                <div className="mb-8 flex items-end justify-between gap-6">
                    <SectionHeading
                        eyebrow={`Latest sales · ${sales.length} closed`}
                        title="Recently closed"
                    />
                    <Link
                        href={PUBLIC_ROUTES.search}
                        className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth group inline-flex shrink-0 items-center gap-1.5 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        Browse the market
                        <ArrowUpRight
                            size={13}
                            strokeWidth={1.5}
                            className="ease-smooth transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>

                <div className="mb-4 h-72">
                    <MapView pins={toSalePins(sales)} label={SALES_MAP_LABEL} />
                </div>

                <div className="scroll-hidden -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-6">
                    {sales.map((sale) => (
                        <SaleCard key={sale.id} sale={sale} />
                    ))}
                </div>

                <p className="text-text-muted mt-4 text-xs">
                    Momentum across the neighbourhoods we cover, updated as each
                    sale records.
                </p>
            </SectionShell>
        </section>
    );
}

LatestSales.displayName = "LatestSales";
