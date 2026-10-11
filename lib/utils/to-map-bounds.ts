import type { LngLatBounds } from "maplibre-gl";
import type { MapBounds } from "@/lib/config/map";

export const toMapBounds = (box: LngLatBounds): MapBounds => ({
    south: box.getSouth(),
    north: box.getNorth(),
    west: box.getWest(),
    east: box.getEast(),
});
