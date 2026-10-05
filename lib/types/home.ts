import type { LucideIcon } from "lucide-react";

export interface GalleryTileData {
    id: string;
    imageUrl: string;
    price: string;
    address: string;
    specs: string;
    agentName: string;
    featured: boolean;
}

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

export interface HomeStat {
    value: string;
    label: string;
}

export interface BrowseEntry {
    id: string;
    label: string;
    count: number;
    href: string;
}

export interface BrowseGroup {
    title: string;
    entries: BrowseEntry[];
}

export interface PremierMediaView {
    image: string;
    name: string;
    badge?: string;
}

export interface PremierSpec {
    icon: LucideIcon;
    value: string;
    label: string;
}
