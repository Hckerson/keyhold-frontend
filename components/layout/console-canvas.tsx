import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function ConsoleCanvas({ children }: { children: ReactNode }) {
    return (
        <div className="py-4 md:py-6">
            <Container className="gutter-x gutter-x--tight">
                <div className="console-canvas w-full min-w-0">{children}</div>
            </Container>
        </div>
    );
}

ConsoleCanvas.displayName = "ConsoleCanvas";
