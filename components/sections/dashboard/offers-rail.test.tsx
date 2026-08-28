import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OffersRail } from "@/components/sections/dashboard/offers-rail";
import { anOffer } from "@/lib/data/__fixtures__/offers";

const representation = () =>
    screen.getByRole("heading", { name: "Representation" }).parentElement;

describe("OffersRail representation", () => {
    it("names the empty book instead of showing a zero count", () => {
        render(<OffersRail offers={[]} />);

        expect(representation()).toHaveTextContent("None");
        expect(representation()).not.toHaveTextContent("0");
        expect(
            screen.getByText("No one is carrying the book yet"),
        ).toBeInTheDocument();
    });

    it("does not claim an empty book while offers are still loading", () => {
        render(<OffersRail offers={[]} pending />);

        expect(
            screen.getByText("Reading who holds the book"),
        ).toBeInTheDocument();
        expect(representation()).not.toHaveTextContent("None");
        expect(
            screen.queryByText("No one is carrying the book yet"),
        ).not.toBeInTheDocument();
    });

    it("shows how many agents carry the book when representation exists", () => {
        render(
            <OffersRail
                offers={[
                    anOffer(),
                    anOffer({
                        id: "off_2",
                        agent: "Marcus Hale",
                        offerPrice: 3_800_000,
                    }),
                ]}
            />,
        );

        expect(representation()).toHaveTextContent("2");
        expect(screen.getByText("Elena Voss")).toBeInTheDocument();
        expect(screen.getByText("Marcus Hale")).toBeInTheDocument();
        expect(screen.queryByText("None")).not.toBeInTheDocument();
    });
});
