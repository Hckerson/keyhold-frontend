import { fireEvent, render, screen } from "@testing-library/react";
import { Flag } from "lucide-react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ReviewSplit } from "@/components/patterns/review-split";
import { REVIEW_ITEMS } from "@/lib/data/__fixtures__/review";

const EMPTY = {
    icon: Flag,
    title: "Queue clear",
    description: "Nothing matches this view.",
};

const scrollIntoView = vi.fn();

const draw = (selectedId?: string) =>
    render(
        <ReviewSplit
            items={REVIEW_ITEMS}
            selectedId={selectedId}
            onSelect={vi.fn()}
            empty={EMPTY}
        >
            <p>Pane for {selectedId}</p>
        </ReviewSplit>,
    );

const placePane = (container: HTMLElement, top: number) => {
    const pane = container.querySelector(".review-pane");
    if (pane) Object.defineProperty(pane, "offsetTop", { value: top });
    return pane;
};

beforeEach(() => {
    scrollIntoView.mockClear();
    Element.prototype.scrollIntoView = scrollIntoView;
});

describe("ReviewSplit", () => {
    it("shows the selected item's pane beside the queue", () => {
        draw("Ben");

        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getByText("Pane for Ben")).toBeInTheDocument();
    });

    it("says the queue is clear when nothing is selected", () => {
        draw();

        expect(screen.getByText("Queue clear")).toBeInTheDocument();
        expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("brings the pane into view when a request is tapped while the pane sits under the queue", () => {
        const { container } = draw("Ada");
        const pane = placePane(container, 480);

        fireEvent.click(screen.getByRole("button", { name: /Ben/ }));

        expect(scrollIntoView).toHaveBeenCalledOnce();
        expect(scrollIntoView.mock.contexts[0]).toBe(pane);
    });

    it("leaves the page where it is when the queue and pane sit side by side", () => {
        const { container } = draw("Ada");
        placePane(container, 0);

        fireEvent.click(screen.getByRole("button", { name: /Ben/ }));

        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it("leaves the page where it is while stepping through the queue with the arrow keys", () => {
        const { container } = draw("Ada");
        placePane(container, 480);

        fireEvent.keyDown(screen.getByRole("list"), { key: "ArrowDown" });

        expect(scrollIntoView).not.toHaveBeenCalled();
    });
});
