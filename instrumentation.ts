import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN, SENTRY_TRACES_SAMPLE_RATE } from "@/lib/config/sentry";

export const onRequestError = Sentry.captureRequestError;

export function register() {
    if (!SENTRY_DSN) return;

    Sentry.init({
        dsn: SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
        sendDefaultPii: false,
    });
}
