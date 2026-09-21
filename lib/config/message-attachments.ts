import { DOCUMENT_UPLOAD } from "@/lib/config/uploads";

export const MESSAGE_ATTACHMENTS = {
    ...DOCUMENT_UPLOAD,
    maxFiles: 5,
    fallbackContent: (count: number) =>
        `Shared ${count} ${count === 1 ? "document" : "documents"}`,
} as const;
