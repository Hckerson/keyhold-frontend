const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const DOCUMENT_UPLOAD = {
    accept: "image/jpeg,image/png,image/webp,image/avif,application/pdf",
    maxBytes: MAX_UPLOAD_BYTES,
} as const;
