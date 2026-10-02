export const isPromotionActive = (featuredUntil: string | null | undefined) =>
    featuredUntil != null && Date.parse(featuredUntil) > Date.now();
