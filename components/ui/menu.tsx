"use client";

import { forwardRef, type ReactNode } from "react";
import { Menu as BaseMenu, type MenuItemProps } from "@base-ui/react/menu";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import {
    FLOATING_ITEM,
    FLOATING_POSITIONER,
    FLOATING_SIDE_OFFSET,
    FLOATING_SURFACE,
} from "@/lib/config/floating";
import { cn } from "@/lib/utils";

const menuItemVariants = cva(FLOATING_ITEM, {
    variants: {
        tone: {
            neutral: "text-text",
            error: "text-error data-highlighted:text-error data-highlighted:bg-error-light",
        },
    },
    defaultVariants: { tone: "neutral" },
});

interface MenuContentProps {
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
    children: ReactNode;
}

interface MenuEntryProps
    extends
        Omit<MenuItemProps, "className" | "ref">,
        VariantProps<typeof menuItemVariants> {
    icon?: LucideIcon;
    className?: string;
}

const Menu = BaseMenu.Root;
const MenuTrigger = BaseMenu.Trigger;
const MenuSeparator = BaseMenu.Separator;
const MenuGroup = BaseMenu.Group;
const MenuGroupLabel = BaseMenu.GroupLabel;

function MenuContent({
    align = "end",
    side = "bottom",
    className,
    children,
}: MenuContentProps) {
    return (
        <BaseMenu.Portal>
            <BaseMenu.Positioner
                align={align}
                side={side}
                sideOffset={FLOATING_SIDE_OFFSET}
                className={FLOATING_POSITIONER}
            >
                <BaseMenu.Popup
                    className={cn(
                        FLOATING_SURFACE,
                        "min-w-40 overflow-hidden",
                        className,
                    )}
                >
                    {children}
                </BaseMenu.Popup>
            </BaseMenu.Positioner>
        </BaseMenu.Portal>
    );
}

MenuContent.displayName = "MenuContent";

const MenuItem = forwardRef<HTMLElement, MenuEntryProps>(
    ({ icon: Glyph, tone, className, children, ...props }, ref) => (
        <BaseMenu.Item
            ref={ref}
            className={cn(menuItemVariants({ tone }), className)}
            {...props}
        >
            {Glyph && (
                <Glyph
                    className="size-3 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            )}
            {children}
        </BaseMenu.Item>
    ),
);

MenuItem.displayName = "MenuItem";

export {
    Menu,
    MenuTrigger,
    MenuContent,
    MenuItem,
    MenuSeparator,
    MenuGroup,
    MenuGroupLabel,
};
