import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN, SENTRY_TRACES_SAMPLE_RATE } from "@/lib/config/sentry";

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
        sendDefaultPii: false,
    });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
