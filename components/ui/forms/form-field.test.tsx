import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { FormField } from "@/components/ui/forms/form-field";

describe("FormField", () => {
    it("carries no accessibility violations", async () => {
        const { container } = render(
            <FormField label="Email address" name="email" type="email" />,
        );

        expect(await axe(container)).toHaveNoViolations();
    });

    it("stays accessible while showing an error", async () => {
        const { container } = render(
            <FormField
                label="Email address"
                name="email"
                type="email"
                error="That email is already registered"
            />,
        );

        expect(await axe(container)).toHaveNoViolations();
    });

    it("ties the label to the control so a screen reader announces it", () => {
        render(<FormField label="Email address" name="email" />);

        expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    });

    it("points the control at its error message rather than only colouring it", () => {
        render(
            <FormField
                label="Email address"
                name="email"
                error="That email is already registered"
            />,
        );

        const field = screen.getByLabelText("Email address");
        expect(field).toHaveAttribute("aria-invalid", "true");
        expect(field).toHaveAccessibleDescription(
            "That email is already registered",
        );
    });
});
