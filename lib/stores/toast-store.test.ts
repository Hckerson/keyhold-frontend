import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TOAST_DURATION, TOAST_STACK_LIMIT } from "@/lib/constants";
import { useToastStore } from "@/lib/stores/toast-store";

const toasts = () => useToastStore.getState().toasts;
const push = useToastStore.getState().push;

beforeEach(() => {
    vi.useFakeTimers();
    useToastStore.getState().clear();
});

afterEach(() => {
    vi.useRealTimers();
});

describe("toast store", () => {
    it("keeps the newest notices when more arrive than the stack holds", () => {
        const titles = ["first", "second", "third", "fourth"];
        titles.forEach((title) => push({ tone: "success", title }));

        expect(toasts()).toHaveLength(TOAST_STACK_LIMIT);
        expect(toasts().map((toast) => toast.title)).toEqual(
            titles.slice(-TOAST_STACK_LIMIT),
        );
    });

    it("retires a notice once its time is up", () => {
        push({ tone: "success", title: "Saved" });

        vi.advanceTimersByTime(TOAST_DURATION);

        expect(toasts()).toHaveLength(0);
    });

    it("leaves a failure on screen longer than a confirmation", () => {
        push({ tone: "success", title: "Saved" });
        push({ tone: "error", title: "Failed" });

        vi.advanceTimersByTime(TOAST_DURATION);

        expect(toasts().map((toast) => toast.title)).toEqual(["Failed"]);
    });

    it("does not retire a notice the reader already dismissed", () => {
        const id = push({ tone: "success", title: "Saved" });
        useToastStore.getState().dismiss(id);

        expect(toasts()).toHaveLength(0);

        push({ tone: "success", title: "Later" });
        vi.advanceTimersByTime(TOAST_DURATION - 1);

        expect(toasts().map((toast) => toast.title)).toEqual(["Later"]);
    });
});
