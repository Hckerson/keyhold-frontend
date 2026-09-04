"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/forms/select";
import {
    HERO_ANY_VALUE,
    HERO_PRICE_OPTIONS,
    HERO_TYPE_OPTIONS,
} from "@/lib/data/home-search";

const fieldLabel =
    "block font-mono text-[10px] tracking-[0.14em] uppercase text-text-muted";

export function HeroSearch() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [type, setType] = useState(HERO_ANY_VALUE);
    const [price, setPrice] = useState(HERO_ANY_VALUE);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("q", location);
        if (type) params.set("type", type);
        if (price) params.set("price", price);
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
                        className="text-text placeholder:text-text-muted w-full bg-transparent text-xs outline-none"
                    />
                </div>
            </div>

            <span className="wide-only bg-border my-2 w-px" />
            <div className="flex flex-col gap-0.5 px-3 py-1.5 sm:w-30">
                <span className={fieldLabel}>Type</span>
                <Select
                    label="Property type"
                    options={HERO_TYPE_OPTIONS}
                    value={type}
                    onChange={setType}
                    variant="bare"
                />
            </div>

            <span className="bg-border my-2 hidden w-px sm:block" />
            <div className="flex flex-col gap-0.5 px-3 py-1.5 sm:w-30">
                <span className={fieldLabel}>Price</span>
                <Select
                    label="Price range"
                    options={HERO_PRICE_OPTIONS}
                    value={price}
                    onChange={setPrice}
                    variant="bare"
                />
            </div>

            <Button
                type="submit"
                emphasis="solid"
                tone="accent"
                size="lg"
                icon={Search}
                className="sm:ml-1.5"
            >
                Search
            </Button>
        </form>
    );
}

HeroSearch.displayName = "HeroSearch";
