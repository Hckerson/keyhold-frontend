"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Divider } from "@/components/ui/divider";
import { Tag } from "@/components/ui/tag";
import {
    Pagination,
    PaginationList,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip } from "@/components/ui/tooltip";

export default function ComponentShowcase() {
    const [openAccordion, setOpenAccordion] = useState<string | null>(
        "buttons",
    );

    return (
        <div className="bg-background min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <header className="mb-12">
                    <h1 className="text-h3 font-display text-text mb-2">
                        Component Showcase
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Explore your design system components
                    </p>
                </header>

                <Accordion className="space-y-4">
                    {/* BUTTONS SECTION */}
                    <AccordionItem value="buttons">
                        <AccordionTrigger
                            onClick={() =>
                                setOpenAccordion(
                                    openAccordion === "buttons"
                                        ? null
                                        : "buttons",
                                )
                            }
                        >
                            <span className="font-semibold">
                                Buttons & CTAs
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-6 p-4">
                                <div>
                                    <p className="text-success mb-4 text-sm font-medium uppercase">
                                        Primary Buttons
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="text-xs"
                                        >
                                            Small
                                        </Button>
                                        <Button variant="primary" size="md">
                                            Medium
                                        </Button>
                                        <Button variant="primary" size="lg">
                                            Large
                                        </Button>
                                        <Button variant="primary" disabled>
                                            Disabled
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Secondary Buttons
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button variant="secondary" size="sm">
                                            Small
                                        </Button>
                                        <Button variant="secondary" size="md">
                                            Medium
                                        </Button>
                                        <Button variant="secondary" size="lg">
                                            Large
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Ghost Buttons
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button variant="ghost">
                                            Ghost Button
                                        </Button>
                                        <Button variant="ghost" disabled>
                                            Disabled
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Danger Buttons
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button variant="danger" size="md">
                                            Delete
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="md"
                                            disabled
                                        >
                                            Disabled
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* BADGES SECTION */}
                    <AccordionItem value="badges">
                        <AccordionTrigger
                            onClick={() =>
                                setOpenAccordion(
                                    openAccordion === "badges"
                                        ? null
                                        : "badges",
                                )
                            }
                        >
                            <span className="font-semibold">Badges & Tags</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-6 p-4">
                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Badge Variants
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge variant="default">Default</Badge>
                                        <Badge variant="primary">Primary</Badge>
                                        <Badge variant="success">Success</Badge>
                                        <Badge variant="warning">Warning</Badge>
                                        <Badge variant="error">Error</Badge>
                                        <Badge variant="accent">Accent</Badge>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Badge Sizes
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge variant="primary" size="sm">
                                            Small
                                        </Badge>
                                        <Badge variant="primary" size="md">
                                            Medium
                                        </Badge>
                                        <Badge variant="primary" size="lg">
                                            Large
                                        </Badge>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Tags
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Tag>Luxury</Tag>
                                        <Tag>Modern</Tag>
                                        <Tag>Waterfront</Tag>
                                        <Tag>Featured</Tag>
                                        <Tag>Pending</Tag>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* CARDS SECTION */}
                    <AccordionItem value="cards">
                        <AccordionTrigger
                            onClick={() =>
                                setOpenAccordion(
                                    openAccordion === "cards" ? null : "cards",
                                )
                            }
                        >
                            <span className="font-semibold">
                                Cards & Containers
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-6 p-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Property Card</CardTitle>
                                            <CardDescription>
                                                Luxury 5-bedroom villa
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-text-secondary mb-4 text-sm">
                                                Premium waterfront property with
                                                modern architecture and resort
                                                amenities.
                                            </p>
                                            <div className="flex gap-2">
                                                <Badge
                                                    variant="primary"
                                                    size="sm"
                                                >
                                                    Featured
                                                </Badge>
                                                <Badge
                                                    variant="accent"
                                                    size="sm"
                                                >
                                                    Luxury
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Stats Card</CardTitle>
                                            <CardDescription>
                                                Market overview
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-text-secondary">
                                                        Active Listings
                                                    </span>
                                                    <span className="text-h5 font-display text-accent">
                                                        1,234
                                                    </span>
                                                </div>
                                                <Divider />
                                                <div className="flex items-center justify-between">
                                                    <span className="text-text-secondary">
                                                        New This Week
                                                    </span>
                                                    <span className="text-h5 font-display text-accent">
                                                        42
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>User Card</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    src="https://api.dicebear.com/9.x/avatar/svg?seed=1"
                                                    alt="User"
                                                />
                                                <div>
                                                    <p className="text-text font-medium">
                                                        Sarah Anderson
                                                    </p>
                                                    <p className="text-text-secondary text-sm">
                                                        Senior Agent
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Quick Actions</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="w-full"
                                                >
                                                    View Details
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full"
                                                >
                                                    Learn More
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* FORMS SECTION */}
                    <AccordionItem value="forms">
                        <AccordionTrigger
                            onClick={() =>
                                setOpenAccordion(
                                    openAccordion === "forms" ? null : "forms",
                                )
                            }
                        >
                            <span className="font-semibold">Form Inputs</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-6 p-4">
                                <div className="max-w-sm">
                                    <Input
                                        label="Text Input"
                                        placeholder="Enter some text..."
                                        id="text-input"
                                    />
                                </div>

                                <div className="max-w-sm">
                                    <Input
                                        label="Email Input"
                                        type="email"
                                        placeholder="name@example.com"
                                        id="email-input"
                                    />
                                </div>

                                <div className="max-w-sm">
                                    <Input
                                        label="Input with Error"
                                        placeholder="Invalid input"
                                        error="This field is required"
                                        id="error-input"
                                    />
                                </div>

                                <div className="max-w-sm">
                                    <label
                                        htmlFor="textarea"
                                        className="text-text mb-2 block text-sm font-medium"
                                    >
                                        Text Area
                                    </label>
                                    <Textarea
                                        placeholder="Enter your message..."
                                        id="textarea"
                                    />
                                </div>

                                <div className="max-w-sm">
                                    <label
                                        htmlFor="select"
                                        className="text-text mb-2 block text-sm font-medium"
                                    >
                                        Select Option
                                    </label>
                                    <Select id="select">
                                        <option value="">
                                            Choose an option
                                        </option>
                                        <option value="option1">
                                            Option 1
                                        </option>
                                        <option value="option2">
                                            Option 2
                                        </option>
                                        <option value="option3">
                                            Option 3
                                        </option>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="checkbox1" />
                                        <label
                                            htmlFor="checkbox1"
                                            className="text-text cursor-pointer text-sm"
                                        >
                                            I agree to the terms
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="checkbox2" checked />
                                        <label
                                            htmlFor="checkbox2"
                                            className="text-text cursor-pointer text-sm"
                                        >
                                            Subscribe to updates
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="switch1"
                                            className="text-text text-sm"
                                        >
                                            Dark Mode
                                        </label>
                                        <Switch id="switch1" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="switch2"
                                            className="text-text text-sm"
                                        >
                                            Notifications
                                        </label>
                                        <Switch id="switch2" checked />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* UTILITIES SECTION */}
                    <AccordionItem value="utilities">
                        <AccordionTrigger
                            onClick={() =>
                                setOpenAccordion(
                                    openAccordion === "utilities"
                                        ? null
                                        : "utilities",
                                )
                            }
                        >
                            <span className="font-semibold">
                                Utilities & Display
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-6 p-4">
                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Breadcrumb
                                    </p>
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/">
                                                    Home
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/properties">
                                                    Properties
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                Luxury Homes
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Divider
                                    </p>
                                    <Card>
                                        <CardContent className="space-y-4">
                                            <p className="text-text-secondary">
                                                Section 1
                                            </p>
                                            <Divider />
                                            <p className="text-text-secondary">
                                                Section 2
                                            </p>
                                            <Divider />
                                            <p className="text-text-secondary">
                                                Section 3
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Pagination
                                    </p>
                                    <Pagination>
                                        <PaginationList>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    ← Prev
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink isActive>
                                                    2
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    4
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    5
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    Next →
                                                </PaginationLink>
                                            </PaginationItem>
                                        </PaginationList>
                                    </Pagination>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Tooltip
                                    </p>
                                    <div className="flex gap-4">
                                        <Tooltip content="This is helpful information">
                                            <span className="border-text-secondary cursor-help border-b border-dotted">
                                                Hover me
                                            </span>
                                        </Tooltip>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-text-secondary mb-4 text-sm font-medium uppercase">
                                        Avatars
                                    </p>
                                    <div className="flex gap-3">
                                        <Avatar
                                            src="https://api.dicebear.com/9.x/avatar/svg?seed=1"
                                            alt="Avatar 1"
                                        />
                                        <Avatar
                                            src="https://api.dicebear.com/9.x/avatar/svg?seed=2"
                                            alt="Avatar 2"
                                        />
                                        <Avatar
                                            src="https://api.dicebear.com/9.x/avatar/svg?seed=3"
                                            alt="Avatar 3"
                                        />
                                        <Avatar alt="No Image" />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
