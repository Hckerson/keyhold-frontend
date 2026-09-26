"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    getVersion,
    LngLatBounds,
    Map as MapLibreMap,
    Marker,
    NavigationControl,
    setWorkerUrl,
} from "maplibre-gl";
import { chartToneFill } from "@/lib/config/chart-tones";
import {
    MAP_ATTRIBUTION,
    MAP_DEFAULT_CENTRE,
    MAP_DEFAULT_ZOOM,
    MAP_FIT_PADDING,
    MAP_MAX_FIT_ZOOM,
    MAP_STYLE_URL,
    MAP_WORKER_BASE,
    MAP_WORKER_ENTRY,
    type MapBounds,
    type MapPin,
} from "@/lib/config/map";
import { cn } from "@/lib/utils";

setWorkerUrl(`${MAP_WORKER_BASE}/${getVersion()}/${MAP_WORKER_ENTRY}`);

const MARKER_CLASS =
    "block size-4 rounded-full border-2 border-background shadow-md cursor-pointer";
const SELECTED_CLASS = "ring-2 ring-accent ring-offset-1";

export interface MapCanvasProps {
    pins: MapPin[];
    selectedId?: string;
    zoom?: number;
    centre?: [number, number];
    fit?: boolean;
    cooperative?: boolean;
    label: string;
    onSelect?: (id: string) => void;
    onBoundsChange?: (bounds: MapBounds) => void;
    className?: string;
}

export function MapCanvas({
    pins,
    selectedId,
    zoom = MAP_DEFAULT_ZOOM,
    centre = MAP_DEFAULT_CENTRE,
    fit = true,
    cooperative = true,
    label,
    onSelect,
    onBoundsChange,
    className,
}: MapCanvasProps) {
    const host = useRef<HTMLDivElement>(null);
    const map = useRef<MapLibreMap | null>(null);
    const markers = useRef<Marker[]>([]);
    const router = useRouter();
    const select = useRef(onSelect);
    const report = useRef(onBoundsChange);
    const camera = useRef({ centre, zoom, cooperative });
    const [ready, setReady] = useState(false);

    useLayoutEffect(() => {
        select.current = onSelect;
        report.current = onBoundsChange;
    });

    useEffect(() => {
        if (!host.current || map.current) return;

        const instance = new MapLibreMap({
            container: host.current,
            style: MAP_STYLE_URL,
            center: camera.current.centre,
            zoom: camera.current.zoom,
            cooperativeGestures: camera.current.cooperative,
            attributionControl: { customAttribution: MAP_ATTRIBUTION },
        });

        instance.addControl(new NavigationControl(), "top-right");
        instance.on("load", () => setReady(true));
        instance.on("moveend", () => {
            const box = instance.getBounds();
            report.current?.({
                south: box.getSouth(),
                north: box.getNorth(),
                west: box.getWest(),
                east: box.getEast(),
            });
        });
        map.current = instance;

        return () => {
            instance.remove();
            map.current = null;
        };
    }, []);

    useEffect(() => {
        const instance = map.current;
        if (!instance || !ready) return;

        markers.current.forEach((marker) => marker.remove());
        markers.current = pins.map((pin) => {
            const element = document.createElement("span");
            element.className = cn(
                MARKER_CLASS,
                chartToneFill[pin.tone],
                pin.id === selectedId && SELECTED_CLASS,
            );
            element.title = `${pin.label} · ${pin.caption}`;
            element.setAttribute(
                "role",
                !select.current && pin.href ? "link" : "button",
            );
            element.setAttribute("tabindex", "0");
            element.setAttribute("aria-label", `${pin.label}, ${pin.caption}`);
            const activate = () => {
                if (select.current) select.current(pin.id);
                else if (pin.href) router.push(pin.href);
            };
            element.addEventListener("click", activate);
            element.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                activate();
            });

            return new Marker({ element })
                .setLngLat([pin.longitude, pin.latitude])
                .addTo(instance);
        });

        if (!fit || pins.length === 0) return;

        const bounds = pins.reduce(
            (box, pin) => box.extend([pin.longitude, pin.latitude]),
            new LngLatBounds(
                [pins[0].longitude, pins[0].latitude],
                [pins[0].longitude, pins[0].latitude],
            ),
        );

        instance.fitBounds(bounds, {
            padding: MAP_FIT_PADDING,
            maxZoom: MAP_MAX_FIT_ZOOM,
            animate: false,
        });
    }, [pins, selectedId, ready, fit, router]);

    return (
        <div
            ref={host}
            role="region"
            aria-label={label}
            className={cn(
                "bg-background-alt border-border-light h-full w-full overflow-hidden rounded-md border",
                className,
            )}
        />
    );
}

MapCanvas.displayName = "MapCanvas";
