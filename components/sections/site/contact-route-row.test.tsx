import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { ContactRouteRow } from "@/components/sections/site/contact-route-row";
import { aContactRoute } from "@/lib/data/__fixtures__/contact-routes";
import type { ContactRoute } from "@/lib/types";

const renderRow = (route: ContactRoute = aContactRoute()) =>
    render(
        <ul>
            <ContactRouteRow route={route} />
        </ul>,
    );

describe("ContactRouteRow", () => {
    it("carries no accessibility violations", async () => {
        const { container } = renderRow();

        expect(await axe(container)).toHaveNoViolations();
    });

    it("names the action without the arrow glyph reaching the link name", () => {
        renderRow();

        expect(
            screen.getByRole("link", { name: "support@keyhol.me" }),
        ).toBeInTheDocument();
    });

    it("carries a prefilled subject through to the address it opens", () => {
        renderRow(
            aContactRoute({
                id: "press",
                action: "Email a press enquiry",
                href: "mailto:support@keyhol.me?subject=Press",
            }),
        );

        expect(
            screen.getByRole("link", { name: "Email a press enquiry" }),
        ).toHaveAttribute("href", "mailto:support@keyhol.me?subject=Press");
    });

    it("sends a route inside the site to its own path rather than an address", () => {
        renderRow(
            aContactRoute({
                id: "advisor",
                action: "Open messages",
                href: "/dashboard/messages",
                note: "Sign-in required",
            }),
        );

        expect(
            screen.getByRole("link", { name: "Open messages" }),
        ).toHaveAttribute("href", "/dashboard/messages");
    });

    it("states what the reader must know before choosing the route", () => {
        renderRow();

        expect(
            screen.getByText("Usually replies in one business day"),
        ).toBeInTheDocument();
    });

    it("leaves the note line out for a route that carries none", () => {
        renderRow(aContactRoute({ note: undefined }));

        expect(
            screen.queryByText("Usually replies in one business day"),
        ).not.toBeInTheDocument();
        expect(screen.getByText("Support")).toBeInTheDocument();
    });
});
