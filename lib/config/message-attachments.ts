const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export const MESSAGE_ATTACHMENTS = {
    accept: "image/jpeg,image/png,image/webp,image/avif,application/pdf",
    maxBytes: MAX_ATTACHMENT_BYTES,
    maxFiles: 5,
    fallbackContent: (count: number) =>
        `Shared ${count} ${count === 1 ? "document" : "documents"}`,
} as const;
