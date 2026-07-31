import { ImageResponse } from "next/og.js";
import React from "react";
import { readFileSync, writeFileSync } from "node:fs";

const PINE = "#1f4e3d";
const BRASS = "#b08d57";
const IVORY = "#faf8f4";
const INK = "#1c1a17";

const [, , inPath, outPath] = process.argv;
const candidates = JSON.parse(readFileSync(inPath, "utf8"));

const glyph = (c, px) => {
    const inner =
        c.mode === "stroke"
            ? `<path d="${c.d}" fill="none" stroke="${BRASS}" stroke-width="${c.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`
            : `<path d="${c.d}" fill="${BRASS}" fill-rule="evenodd" clip-rule="evenodd"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${px}" height="${px}">${inner}</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const h = React.createElement;

const tile = (c, box, radius) =>
    h(
        "div",
        {
            style: {
                display: "flex",
                width: box,
                height: box,
                alignItems: "center",
                justifyContent: "center",
                background: PINE,
                borderRadius: radius,
            },
        },
        h("img", {
            src: glyph(c, Math.round(box * 0.58)),
            width: Math.round(box * 0.58),
            height: Math.round(box * 0.58),
        }),
    );

const card = (c) =>
    h(
        "div",
        {
            key: c.name,
            style: {
                display: "flex",
                flexDirection: "column",
                width: 300,
                padding: 16,
                background: "#ffffff",
                border: "1px solid #e7e1d7",
                gap: 10,
            },
        },
        h(
            "div",
            {
                style: {
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 14,
                    height: 104,
                },
            },
            tile(c, 96, 12),
            tile(c, 32, 4),
            tile(c, 20, 3),
            h("img", {
                src: glyph({ ...c }, 44),
                width: 44,
                height: 44,
                style: { filter: "none" },
            }),
        ),
        h(
            "div",
            { style: { display: "flex", fontSize: 15, color: INK } },
            `${c.name}`,
        ),
        h(
            "div",
            { style: { display: "flex", fontSize: 12, color: "#57514a" } },
            `${c.lens ?? ""} · ${c.mode}${c.mode === "stroke" ? ` ${c.strokeWidth}` : ""}${c.votes !== undefined ? ` · ${c.votes}/3` : ""}`,
        ),
    );

const COLS = 3;
const rows = [];
for (let i = 0; i < candidates.length; i += COLS) {
    rows.push(candidates.slice(i, i + COLS));
}

const sheet = h(
    "div",
    {
        style: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: IVORY,
            padding: 20,
            gap: 16,
        },
    },
    ...rows.map((row, i) =>
        h(
            "div",
            { key: `r${i}`, style: { display: "flex", gap: 16 } },
            ...row.map(card),
        ),
    ),
);

const width = COLS * 300 + (COLS - 1) * 16 + 40;
const height = rows.length * 190 + (rows.length - 1) * 16 + 40;

const res = new ImageResponse(sheet, { width, height });
const buf = Buffer.from(await res.arrayBuffer());
writeFileSync(outPath, buf);
console.log(`wrote ${outPath} ${width}x${height} (${buf.length} bytes)`);
