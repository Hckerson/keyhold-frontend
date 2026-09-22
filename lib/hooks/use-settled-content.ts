"use client";

import { useEffect, useRef } from "react";

export function useSettledContent<T>(open: boolean, content: T): T {
    const settled = useRef(content);

    useEffect(() => {
        if (open) settled.current = content;
    });

    return open ? content : settled.current;
}
