import { X } from "lucide-react";
import { LogoChip } from "@/components/brand/logo-chip";
import { cn } from "@/lib/utils";

export interface SidebarBrandProps {
    brand: { full: string; tagline?: string };
    collapsed: boolean;
    onClose?: () => void;
}

export function SidebarBrand({ brand, collapsed, onClose }: SidebarBrandProps) {
    return (
        <div
            className={cn(
                "border-sidebar-border flex h-14 shrink-0 items-center border-b",
                collapsed ? "justify-center px-0" : "gap-2 px-3",
            )}
        >
            <LogoChip tone="dark" size="sm" />
            {!collapsed && (
                <div className="min-w-0">
                    <p className="text-sidebar-text-active font-display truncate text-xs leading-none font-light">
                        {brand.full}
                    </p>
                    {brand.tagline && (
                        <p className="rail-label mt-1 truncate">
                            {brand.tagline}
                        </p>
                    )}
                </div>
            )}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="desk-hidden text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active focus-visible:ring-highlight ease-smooth ml-auto grid size-8 shrink-0 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <X size={16} strokeWidth={1.5} />
            </button>
        </div>
    );
}
