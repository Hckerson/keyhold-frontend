export const FLOATING_SIDE_OFFSET = 4;

export const FLOATING_POSITIONER = "z-popover outline-none";

export const FLOATING_ENTRANCE =
    "ease-smooth origin-(--transform-origin) transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0";

export const FLOATING_SURFACE = `border-border bg-background-alt rounded-lg border shadow-lg outline-none ${FLOATING_ENTRANCE}`;

export const FLOATING_ITEM =
    "ease-smooth data-highlighted:bg-background-muted data-highlighted:text-text flex h-8 cursor-default items-center gap-2 rounded-md px-2 text-xs outline-none transition-colors duration-200 select-none data-disabled:pointer-events-none data-disabled:opacity-50";
