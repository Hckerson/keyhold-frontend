import type { Transaction } from "@/lib/types";

export const ADMIN_TRANSACTIONS: Transaction[] = [
    {
        id: "1",
        property: "456 Oak Avenue",
        buyer: "John Doe",
        agent: "Sarah Chen",
        price: 3_200_000,
        status: "escrow",
        initiatedDate: "2024-07-05",
    },
    {
        id: "2",
        property: "789 Sunset Blvd",
        buyer: "Sarah Johnson",
        agent: "Michael Rodriguez",
        price: 2_950_000,
        status: "pending",
        initiatedDate: "2024-07-10",
    },
    {
        id: "3",
        property: "234 Oak Street",
        buyer: "Michael Chen",
        agent: "Jennifer Martinez",
        price: 4_500_000,
        status: "completed",
        initiatedDate: "2024-06-28",
    },
    {
        id: "4",
        property: "567 Palm Drive",
        buyer: "Elizabeth Brown",
        agent: "David Williams",
        price: 3_800_000,
        status: "completed",
        initiatedDate: "2024-06-15",
    },
];
