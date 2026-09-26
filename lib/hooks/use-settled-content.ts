"use client";

import { useState } from "react";

export function useSettledContent<T>(open: boolean, content: T): T {
    const [settled, setSettled] = useState(content);

    if (open && settled !== content) setSettled(content);

    return open ? content : settled;
}
