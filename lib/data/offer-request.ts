import { OFFER_WINDOW_DAYS } from "@/lib/constants";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const offerExpiry = (from: Date = new Date()) =>
    new Date(from.getTime() + OFFER_WINDOW_DAYS * MS_PER_DAY).toISOString();

export const askGapPercent = (listPrice: number, offeredPrice: number) =>
    listPrice <= 0 ? 0 : ((listPrice - offeredPrice) / listPrice) * 100;
