import { Panel } from "@/components/ui/panel";
import { APPOINTMENT_TYPES } from "@/components/features/agent/appointment-row";
import { APPOINTMENT_TYPE_KEYS } from "@/lib/data/agent-calendar";

export function CalendarLegend() {
    return (
        <Panel title="Legend">
            <div className="space-y-2">
                {APPOINTMENT_TYPE_KEYS.map((type) => {
                    const {
                        icon: Icon,
                        accent,
                        label,
                    } = APPOINTMENT_TYPES[type];
                    return (
                        <div
                            key={type}
                            className="flex items-center gap-2 text-xs"
                        >
                            <Icon
                                size={12}
                                strokeWidth={1.5}
                                className={accent}
                            />
                            <span className="text-text-secondary">{label}</span>
                        </div>
                    );
                })}
            </div>
        </Panel>
    );
}

CalendarLegend.displayName = "CalendarLegend";
