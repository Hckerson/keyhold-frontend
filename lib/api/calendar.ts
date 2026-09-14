import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { CalendarStatus } from "@/lib/validations/calendar";

export const calendarAPI = {
    googleStatus: () => query.get<CalendarStatus>(config.api.calendar.google),

    disconnectGoogle: () =>
        query.delete<CalendarStatus>(config.api.calendar.google),
};
