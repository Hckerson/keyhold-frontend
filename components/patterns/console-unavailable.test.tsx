import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";

const fallback = CONSOLE_FALLBACKS.buyerTransactions;

describe("ConsoleUnavailable", () => {
    it("carries no accessibility violations", async () => {
        const { container } = render(
            <ConsoleUnavailable fallback={fallback} onRetry={vi.fn()} />,
        );

        expect(await axe(container)).toHaveNoViolations();
    });

    it("names what failed rather than showing a bare error", () => {
        render(<ConsoleUnavailable fallback={fallback} onRetry={vi.fn()} />);

        expect(screen.getByText(fallback.title)).toBeInTheDocument();
        expect(screen.getByText(fallback.description)).toBeInTheDocument();
    });

    it("offers a retry the keyboard can reach", async () => {
        const onRetry = vi.fn();
        render(<ConsoleUnavailable fallback={fallback} onRetry={onRetry} />);

        const retry = screen.getByRole("button", { name: /retry/i });
        retry.focus();
        expect(retry).toHaveFocus();

        await userEvent.keyboard("{Enter}");
        expect(onRetry).toHaveBeenCalledTimes(1);
    });
});
