import type { ReactNode } from "react";

export interface SettingRowProps {
    title: string;
    caption: string;
    captionId?: string;
    children: ReactNode;
}

export function SettingRow({
    title,
    caption,
    captionId,
    children,
}: SettingRowProps) {
    return (
        <li className="flex items-center gap-4 px-4 py-3">
            <div className="min-w-0 flex-1">
                <p className="text-text text-xs">{title}</p>
                <p
                    id={captionId}
                    className="text-text-secondary mt-0.5 text-xs text-pretty"
                >
                    {caption}
                </p>
            </div>
            {children}
        </li>
    );
}

SettingRow.displayName = "SettingRow";
