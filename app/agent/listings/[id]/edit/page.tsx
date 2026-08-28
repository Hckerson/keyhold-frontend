import { use } from "react";
import { ListingEditConsole } from "@/components/sections/agent/listing-edit-console";

export default function EditListingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    return <ListingEditConsole listingId={id} />;
}
