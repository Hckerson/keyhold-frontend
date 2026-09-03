"use client";

import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { ToastViewport } from "@/components/ui/toast-viewport";
import { createQueryClient } from "@/lib/api/query-client";
import { config } from "@/lib/constants";

export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(createQueryClient);

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <MotionProvider>
                    {children}
                    <ToastViewport />
                </MotionProvider>
            </SessionProvider>
            {config.isDev && (
                <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-right"
                />
            )}
        </QueryClientProvider>
    );
}
