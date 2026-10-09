import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReviewQueue } from "@/components/patterns/review-queue";
import type { ReviewQueueItem } from "@/lib/types";

const ITEMS: ReviewQueueItem[] = ["Ada", "Ben", "Cy"].map((name) => ({
    id: name,
    title: name,
    caption: "Passport · Buyer",
    moment: "2d",
}));

const press = (key: string, selectedId = "Ada") => {
    const onSelect = vi.fn();
    render(
        <ReviewQueue
            items={ITEMS}
            selectedId={selectedId}
            onSelect={onSelect}
        />,
    );
    fireEvent.keyDown(screen.getByRole("list"), { key });
    return onSelect;
};

describe("ReviewQueue", () => {
    it("selects and focuses the next item on the down arrow", () => {
        const onSelect = press("ArrowDown");

        expect(onSelect).toHaveBeenCalledExactlyOnceWith("Ben");
        expect(screen.getByRole("button", { name: /Ben/ })).toHaveFocus();
    });

    it("selects the previous item on the up arrow", () => {
        expect(press("ArrowUp", "Ben")).toHaveBeenCalledWith("Ada");
    });

    it("wraps from the first item up to the last", () => {
        expect(press("ArrowUp")).toHaveBeenCalledWith("Cy");
    });

    it("ignores every other key", () => {
        expect(press("Enter")).not.toHaveBeenCalled();
    });
});
