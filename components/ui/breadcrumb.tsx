import { forwardRef, type ComponentProps, type HTMLAttributes } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const BREADCRUMB_LABEL = "Breadcrumb";

const breadcrumbLinkClass =
    "text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth rounded-xs text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

const Breadcrumb = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
    ({ "aria-label": label = BREADCRUMB_LABEL, ...props }, ref) => (
        <nav ref={ref} aria-label={label} {...props} />
    ),
);

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef<
    HTMLOListElement,
    HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
    <ol
        ref={ref}
        className={cn("flex min-w-0 items-center gap-1.5", className)}
        {...props}
    />
));

BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
    ({ className, ...props }, ref) => (
        <li
            ref={ref}
            className={cn("flex min-w-0 items-center", className)}
            {...props}
        />
    ),
);

BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = forwardRef<
    HTMLAnchorElement,
    ComponentProps<typeof Link>
>(({ className, ...props }, ref) => (
    <Link ref={ref} className={cn(breadcrumbLinkClass, className)} {...props} />
));

BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = forwardRef<
    HTMLSpanElement,
    HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        aria-current="page"
        className={cn(
            "text-text max-w-[40ch] truncate text-xs font-medium",
            className,
        )}
        {...props}
    />
));

BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = forwardRef<
    HTMLLIElement,
    HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn("text-text-muted flex items-center", className)}
        {...props}
    >
        <ChevronRight className="size-3" strokeWidth={1.5} />
    </li>
));

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    breadcrumbLinkClass,
};
