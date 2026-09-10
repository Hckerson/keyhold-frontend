export type PoiKind = "school" | "transit" | "park" | "restaurant";

export interface NearbyPlace {
    id: string;
    kind: PoiKind;
    name: string;
    latitude: number;
    longitude: number;
}
