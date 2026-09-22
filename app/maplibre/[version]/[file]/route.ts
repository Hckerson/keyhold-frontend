import { readFile } from "node:fs/promises";
import { join } from "node:path";
import maplibre from "maplibre-gl/package.json";
import { MAP_WORKER_FILES } from "@/lib/config/map";

const DIST = join(process.cwd(), "node_modules", "maplibre-gl", "dist");

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ version: string; file: string }> },
) {
    const { version, file } = await params;
    if (version !== maplibre.version || !MAP_WORKER_FILES.includes(file))
        return new Response(null, { status: 404 });

    return new Response(await readFile(join(DIST, file)), {
        headers: {
            "Content-Type": "text/javascript; charset=utf-8",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
