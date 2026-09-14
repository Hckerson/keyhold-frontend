import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { Image } from "@/components/ui/image";
import { MapView } from "@/components/ui/map-view";
import type { MapPin } from "@/lib/config/map";

export interface LatestSaleData {
    id: string;
    latitude: number | null;
    longitude: number | null;
    imageUrl: string;
    address: string;
    locality: string;
    price: string;
    specs: string;
    soldLabel: string;
    daysOnMarket: number;
}

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
                      tone: "success" as const,
                      href: PUBLIC_ROUTES.listing(sale.id),
                  },
              ],
    );

function SaleCard({ sale }: { sale: LatestSaleData }) {
    return (
        <Link
            href={PUBLIC_ROUTES.listing(sale.id)}
            className="group border-border bg-background-muted hover:border-border-dark focus-visible:ring-accent ease-smooth flex w-[68vw] max-w-[248px] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none md:w-auto md:max-w-none"
        >
            <div className="relative aspect-4/3 overflow-hidden">
                <Image
                    variant="bare"
                    fill
                    sizes="(min-width: 48rem) 25vw, 68vw"
                    src={sale.imageUrl}
                    alt={sale.address}
                    className="ease-smooth object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="bg-sidebar/75 text-text-inverse ring-sidebar-border absolute top-3 left-3 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase ring-1 backdrop-blur-md">
                    {sale.soldLabel}
                </span>
            </div>

            <div className="flex flex-col gap-2 p-3">
                <p className="text-text text-h6 font-display font-light tabular-nums">
                    {sale.price}
                </p>
                <div className="flex flex-col gap-0.5">
                    <p className="text-text-secondary truncate text-xs">
                        {sale.address}
                    </p>
                    <p className="text-text-muted truncate text-xs">
                        {sale.locality}
                    </p>
                </div>
                <div className="border-border flex items-center justify-between gap-2 border-t pt-2">
                    <span className="text-text-muted font-mono text-[10px] tracking-[0.12em] uppercase">
                        {sale.specs}
                    </span>
                    <span className="text-success inline-flex items-center gap-1 text-xs font-medium tabular-nums">
                        <TrendingUp size={12} strokeWidth={1.5} />
                        {sale.daysOnMarket}d
                    </span>
                </div>
            </div>
        </Link>
    );
}

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
