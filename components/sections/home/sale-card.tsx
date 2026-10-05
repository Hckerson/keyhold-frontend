import Link from "next/link";
import { Clock } from "lucide-react";
import { Image } from "@/components/ui/image";
import { PUBLIC_ROUTES } from "@/lib/constants";
import type { LatestSaleData } from "@/lib/types";

export interface SaleCardProps {
    sale: LatestSaleData;
}

export function SaleCard({ sale }: SaleCardProps) {
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
                    <span
                        className="text-text-secondary inline-flex items-center gap-1 text-xs font-medium tabular-nums"
                        title="Days on market"
                    >
                        <Clock size={12} strokeWidth={1.5} />
                        {sale.daysOnMarket}d
                    </span>
                </div>
            </div>
        </Link>
    );
}
