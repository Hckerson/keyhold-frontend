import { PropertyCard, type Property } from "@/components/ui/property-card";

const properties: Property[] = [
    {
        id: "1",
        price: 2450000,
        address: "148 Ridgeline Drive",
        locality: "Bel Air, CA",
        beds: 5,
        baths: 6,
        sqft: 6200,
        imageUrl:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        status: "for-sale",
        featured: true,
    },
    {
        id: "2",
        price: 1180000,
        address: "27 Marina Crescent",
        locality: "Sausalito, CA",
        beds: 3,
        baths: 2,
        sqft: 2400,
        imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        status: "new",
    },
    {
        id: "3",
        price: 8500,
        address: "9 Vermeer Loft, Unit 12",
        locality: "SoHo, New York",
        beds: 2,
        baths: 2,
        sqft: 1650,
        imageUrl:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        status: "for-rent",
    },
    {
        id: "4",
        price: 3950000,
        address: "Cliffside Estate, Palm Vista",
        locality: "Malibu, CA",
        beds: 6,
        baths: 7,
        sqft: 8100,
        imageUrl:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        status: "for-sale",
        featured: true,
    },
    {
        id: "5",
        price: 675000,
        address: "412 Birchwood Lane",
        locality: "Portland, OR",
        beds: 3,
        baths: 2,
        sqft: 1980,
        imageUrl:
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        status: "sold",
    },
    {
        id: "6",
        price: 1725000,
        address: "60 Cypress Point",
        locality: "Carmel-by-the-Sea, CA",
        beds: 4,
        baths: 3,
        sqft: 3200,
        imageUrl:
            "https://images.unsplash.com/photo-1580216643062-cf460548a66a?w=800&q=80",
        status: "new",
    },
];

export default function TestPage() {
    return (
        <main className="bg-background min-h-screen px-6 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-6xl space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-h2 font-display text-text font-light">
                        Curated Residences
                    </h1>
                    <p className="text-text-secondary mx-auto max-w-2xl text-lg">
                        A preview of the PropertyCard component — decomposed,
                        data-driven, and rendered entirely in the house design
                        language.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </main>
    );
}
