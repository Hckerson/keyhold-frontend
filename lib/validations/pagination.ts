import { z } from "zod";

export const pageOf = <Item extends z.ZodType>(item: Item) =>
    z.object({
        items: z.array(item),
        total: z.number().int(),
        page: z.number().int(),
        limit: z.number().int(),
        pageCount: z.number().int(),
    });

export const pageQuerySchema = z.object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
});

export type PageQuery = z.infer<typeof pageQuerySchema>;
