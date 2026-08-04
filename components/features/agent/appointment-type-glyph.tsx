import { cn } from "@/lib/utils";
import { chartToneText } from "@/lib/config/chart-tones";
import {
    APPOINTMENT_TYPES,
    type AppointmentType,
} from "@/lib/config/appointment-tones";

export interface AppointmentTypeGlyphProps {
    type: AppointmentType;
    className?: string;
}

export function AppointmentTypeGlyph({
    type,
    className,
}: AppointmentTypeGlyphProps) {
    const { icon: Icon, tone, label } = APPOINTMENT_TYPES[type];

    return (
        <Icon
            role="img"
            aria-label={label}
            strokeWidth={1.5}
            className={cn("size-3 shrink-0", chartToneText[tone], className)}
        />
    );
}

AppointmentTypeGlyph.displayName = "AppointmentTypeGlyph";
