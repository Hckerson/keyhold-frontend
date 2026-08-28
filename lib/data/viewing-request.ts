import { VIEWING_LEAD_DAYS } from "@/lib/constants";
import { VIEWING_SLOTS } from "@/lib/config/viewing-request";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const pad = (value: number) => String(value).padStart(2, "0");

export const toDateInput = (date: Date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const earliestViewingDate = (from: Date = new Date()) =>
    toDateInput(new Date(from.getTime() + VIEWING_LEAD_DAYS * MS_PER_DAY));

export const toProposedTimes = (date: string, slotIds: string[]): string[] =>
    VIEWING_SLOTS.filter((slot) => slotIds.includes(slot.id))
        .map((slot) => new Date(`${date}T${pad(slot.hour)}:00:00`))
        .filter((at) => at.getTime() > Date.now())
        .map((at) => at.toISOString());
