"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const TYPES = ["Any type", "Estate", "Villa", "Penthouse"];
const PRICES = [
    { label: "Any price", value: "" },
    { label: "$1M – $5M", value: "1000000" },
    { label: "$5M – $10M", value: "5000000" },
    { label: "$10M+", value: "10000000" },
];

const fieldLabel =
    "block font-mono text-[10px] tracking-[0.14em] uppercase text-text-muted";
const fieldControl =
    "w-full bg-transparent text-xs text-text outline-none placeholder:text-text-muted";

export function HeroSearch() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [type, setType] = useState(TYPES[0]);
    const [price, setPrice] = useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("q", location);
        if (type !== TYPES[0]) params.set("type", type.toLowerCase());
        if (price) params.set("min", price);
        const qs = params.toString();
        router.push(qs ? `/search?${qs}` : "/search");
    };

    return (
        <form
            onSubmit={submit}
            className="border-border bg-background/80 flex w-full max-w-160 flex-col gap-1 rounded-xl border p-1.5 shadow-xl backdrop-blur-md sm:flex-row sm:items-stretch sm:gap-0"
        >
            <div className="flex flex-1 items-center gap-2.5 px-3 py-1.5">
                <MapPin
                    size={16}
                    strokeWidth={1.5}
                    className="text-highlight-dark shrink-0"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <label htmlFor="hero-location" className={fieldLabel}>
                        Location
                    </label>
                    <input
                        id="hero-location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, neighborhood, or address"
                        className={fieldControl}
                    />
                </div>
            </div>

            <span className="wide-only bg-border my-2 w-px" />
            <div className="flex flex-col gap-0.5 px-3 py-1.5 sm:w-30">
                <label htmlFor="hero-type" className={fieldLabel}>
                    Type
                </label>
                <select
                    id="hero-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={`${fieldControl} text-text-secondary cursor-pointer`}
                >
                    {TYPES.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </div>

            <span className="bg-border my-2 hidden w-px sm:block" />
            <div className="flex flex-col gap-0.5 px-3 py-1.5 sm:w-30">
                <label htmlFor="hero-price" className={fieldLabel}>
                    Price
                </label>
                <select
                    id="hero-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`${fieldControl} text-text-secondary cursor-pointer`}
                >
                    {PRICES.map((p) => (
                        <option key={p.label} value={p.value}>
                            {p.label}
                        </option>
                    ))}
                </select>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="md"
                className="sm:ml-1.5"
            >
                <Search size={15} strokeWidth={1.5} className="mr-1.5" />
                Search
            </Button>
        </form>
    );
}

HeroSearch.displayName = "HeroSearch";
