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
    "block font-mono text-[9px] tracking-[0.12em] uppercase text-text-muted";

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
            className="border-border bg-background flex flex-col gap-1 rounded-2xl border p-2 shadow-xl sm:flex-row sm:items-stretch sm:gap-0"
        >
            <div className="flex flex-1 items-center gap-2.5 px-4 py-2">
                <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="text-highlight-dark shrink-0"
                />
                <div className="min-w-0 flex-1">
                    <label htmlFor="hero-location" className={fieldLabel}>
                        Location
                    </label>
                    <input
                        id="hero-location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, neighborhood, or address"
                        className="text-text placeholder:text-text-muted w-full bg-transparent text-sm outline-none"
                    />
                </div>
            </div>

            <span className="bg-border my-2.5 hidden w-px sm:block" />
            <div className="px-4 py-2 sm:w-32">
                <label htmlFor="hero-type" className={fieldLabel}>
                    Type
                </label>
                <select
                    id="hero-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="text-text-secondary w-full cursor-pointer bg-transparent text-sm outline-none"
                >
                    {TYPES.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </div>

            <span className="bg-border my-2.5 hidden w-px sm:block" />
            <div className="px-4 py-2 sm:w-32">
                <label htmlFor="hero-price" className={fieldLabel}>
                    Price
                </label>
                <select
                    id="hero-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="text-text-secondary w-full cursor-pointer bg-transparent text-sm outline-none"
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
                size="lg"
                className="sm:ml-1.5"
            >
                <Search size={18} strokeWidth={1.5} className="mr-2" />
                Search
            </Button>
        </form>
    );
}

HeroSearch.displayName = "HeroSearch";
