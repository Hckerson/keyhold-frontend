import "@tanstack/react-query";
import type { MutationFeedback } from "@/lib/config/feedback";

declare module "@tanstack/react-query" {
    interface Register {
        mutationMeta: MutationFeedback;
    }
}
