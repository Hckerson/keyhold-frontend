import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { TagInput } from "@/components/ui/forms/tag-input";

const setup = (values: string[] = []) => {
    const onChange = vi.fn();
    render(
        <TagInput
            label="Amenities"
            name="amenities"
            values={values}
            onChange={onChange}
        />,
    );
    return { onChange, field: screen.getByLabelText("Amenities") };
};

describe("TagInput", () => {
    it("carries no accessibility violations while holding entries", async () => {
        const { container } = render(
            <TagInput
                label="Amenities"
                name="amenities"
                values={["Pool", "Gym"]}
                onChange={vi.fn()}
            />,
        );

        expect(await axe(container)).toHaveNoViolations();
    });

    it("commits a typed entry on enter instead of leaving it in the box", async () => {
        const { onChange, field } = setup();

        await userEvent.type(field, "Wine cellar{Enter}");

        expect(onChange).toHaveBeenCalledWith(["Wine cellar"]);
        expect(field).toHaveValue("");
    });

    it("commits on a comma so pasted comma-separated text still splits", async () => {
        const { onChange, field } = setup();

        await userEvent.type(field, "Gym,");

        expect(onChange).toHaveBeenCalledWith(["Gym"]);
    });

    it("refuses a duplicate entry regardless of casing", async () => {
        const { onChange, field } = setup(["Pool"]);

        await userEvent.type(field, "pool{Enter}");

        expect(onChange).not.toHaveBeenCalled();
    });

    it("drops the trailing entry when backspace is pressed on an empty box", async () => {
        const { onChange, field } = setup(["Pool", "Gym"]);

        await userEvent.type(field, "{Backspace}");

        expect(onChange).toHaveBeenCalledWith(["Pool"]);
    });

    it("names the entry it removes so the button is not just an anonymous x", () => {
        setup(["Pool"]);

        expect(
            screen.getByRole("button", { name: "Remove Pool" }),
        ).toBeInTheDocument();
    });
});
