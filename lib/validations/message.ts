import { z } from "zod";
import { userSummarySchema } from "@/lib/validations/user";

export const messageAttachmentSchema = z.object({
    id: z.string(),
    filename: z.string(),
    url: z.url(),
    mimeType: z.string(),
    sizeBytes: z.number().int().nonnegative(),
    createdAt: z.iso.datetime(),
});

export const messageSchema = z.object({
    id: z.string(),
    content: z.string(),
    isRead: z.boolean(),
    connectionId: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
    sender: userSummarySchema.optional(),
    receiver: userSummarySchema.optional(),
    attachments: z.array(messageAttachmentSchema).optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const createMessageSchema = z.object({
    connectionId: z.string().min(1),
    content: z.string().min(1, "Write a message before sending"),
});

export const unreadMessageCountSchema = z.object({
    unreadCount: z.number().int(),
});

export type MessageAttachment = z.infer<typeof messageAttachmentSchema>;
export type Message = z.infer<typeof messageSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type UnreadMessageCount = z.infer<typeof unreadMessageCountSchema>;
