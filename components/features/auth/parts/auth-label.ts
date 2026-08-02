import { cva } from "class-variance-authority";

export const authLabelVariants = cva("font-mono text-[10px] uppercase", {
    variants: {
        tier: {
            marker: "tracking-[0.18em]",
            label: "tracking-[0.14em]",
        },
    },
    defaultVariants: {
        tier: "label",
    },
});
