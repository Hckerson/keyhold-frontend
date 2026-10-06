"use client";

import { useState } from "react";

export function useHydratedState<T>(ready: boolean, baseline: T) {
    const [value, setValue] = useState(baseline);
    const [hydrated, setHydrated] = useState(false);

    if (ready && !hydrated) {
        setValue(baseline);
        setHydrated(true);
    }

    return [value, setValue] as const;
}
