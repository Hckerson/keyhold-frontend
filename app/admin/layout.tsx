"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

interface NavItem {
    label: string;
    href: string;
    icon: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Listings", href: "/admin/listings", icon: "🏠" },
    { label: "Users", href: "/admin/users", icon: "👥" },
    { label: "Transactions", href: "/admin/transactions", icon: "💳" },
    { label: "Payments", href: "/admin/payments", icon: "💰" },
    { label: "Verifications", href: "/admin/verifications", icon: "✅" },
    { label: "Reports", href: "/admin/reports", icon: "📈" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="bg-primary flex h-screen">
            <aside
                className={`${
                    sidebarOpen ? "w-64" : "w-20"
                } bg-primary-dark border-border flex flex-col border-r transition-all duration-300`}
            >
                <div className="border-border border-b p-6">
                    <h1
                        className={`${sidebarOpen ? "text-h4" : "text-h6"} font-display text-accent font-light`}
                    >
                        {sidebarOpen ? "Admin" : "ADM"}
                    </h1>
                </div>

                <nav className="flex-1 space-y-2 p-4">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:bg-primary group flex items-center gap-4 rounded-lg px-4 py-3 transition-colors"
                            title={!sidebarOpen ? item.label : undefined}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {sidebarOpen && (
                                <span className="text-text-secondary group-hover:text-text text-sm font-medium">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="border-border border-t p-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-text-secondary hover:text-text w-full px-3 py-2 text-xs transition-colors"
                        title="Toggle sidebar"
                    >
                        {sidebarOpen ? "←" : "→"}
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-auto">
                <div className="bg-primary min-h-screen">
                    <div className="bg-primary border-border sticky top-0 z-40 border-b">
                        <Container className="flex items-center justify-between py-4">
                            <h2 className="text-h5 text-text font-light">
                                Admin Console
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="text-text-secondary text-sm">
                                    <p className="text-text font-medium">
                                        Admin User
                                    </p>
                                    <p className="text-xs">Super Admin</p>
                                </div>
                                <button className="bg-accent/20 hover:bg-accent/30 text-accent flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors">
                                    AU
                                </button>
                            </div>
                        </Container>
                    </div>

                    <div className="p-6">
                        <Container>{children}</Container>
                    </div>
                </div>
            </main>
        </div>
    );
}
