"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { MapCanvasProps } from "@/components/ui/map-canvas";

export type MapViewProps = MapCanvasProps;

export const MapView = dynamic(
    () =>
        import("@/components/ui/map-canvas").then((module) => module.MapCanvas),
    {
        ssr: false,
        loading: () => <Skeleton className="h-full w-full rounded-md" />,
    },
);
