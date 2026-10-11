export const isPromotionActive = (
    featuredUntil: string | null | undefined,
    now = new Date(),
) => featuredUntil != null && new Date(featuredUntil) > now;
