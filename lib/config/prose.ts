export const PROSE_COPY = {
    contents: "On this page",
    updated: "Last updated",
} as const;

export const PROSE_CONTENTS_MIN_BLOCKS = 3;

export const proseHeadingId = (blockId: string) => `${blockId}-heading`;
