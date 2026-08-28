"use client";

import type { ReactNode } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

export interface DataTablePanelProps<T> {
    row: T | null;
    size: "sm" | "md" | "lg";
    onClose: () => void;
    rowLabel?: (row: T) => string;
    panelTitle?: (row: T) => ReactNode;
    panelFooter?: (row: T) => ReactNode;
    renderDetail?: (row: T) => ReactNode;
}

export function DataTablePanel<T>({
    row,
    size,
    onClose,
    rowLabel,
    panelTitle,
    panelFooter,
    renderDetail,
}: DataTablePanelProps<T>) {
    return (
        <Drawer
            open={row !== null}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
            size={size}
            label={row && rowLabel ? rowLabel(row) : "Row details"}
        >
            {row && (
                <>
                    <DrawerHeader>
                        <DrawerTitle>
                            {panelTitle ? panelTitle(row) : rowLabel?.(row)}
                        </DrawerTitle>
                    </DrawerHeader>

                    <DrawerBody>{renderDetail?.(row)}</DrawerBody>

                    {panelFooter && (
                        <DrawerFooter>{panelFooter(row)}</DrawerFooter>
                    )}
                </>
            )}
        </Drawer>
    );
}

DataTablePanel.displayName = "DataTablePanel";
