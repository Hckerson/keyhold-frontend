import { MAP_TILE_ORIGIN } from "@/lib/config/security-headers";
import type { ChartTone } from "@/lib/config/chart-tones";

export const MAP_STYLE_URL = `${MAP_TILE_ORIGIN}/styles/positron`;

export const MAP_ATTRIBUTION =
    '<a href="https://openfreemap.org" target="_blank" rel="noreferrer">OpenFreeMap</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>';

export const MAP_DEFAULT_CENTRE: [number, number] = [-118.4004, 34.0736];
export const MAP_DEFAULT_ZOOM = 9;
export const MAP_DETAIL_ZOOM = 14;
export const MAP_FIT_PADDING = 56;
export const MAP_MAX_FIT_ZOOM = 15;

export interface MapPin {
    id: string;
    latitude: number;
    longitude: number;
    label: string;
    caption: string;
    tone: ChartTone;
    href?: string;
}
