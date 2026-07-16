import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {
    children: ReactNode;
}

interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
    children: ReactNode;
}

interface BreadcrumbLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href?: string;
    children: ReactNode;
}

type BreadcrumbSeparatorProps = HTMLAttributes<HTMLLIElement>;

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
    ({ className, ...props }, ref) => (
        <nav ref={ref} className={cn("", className)} {...props} />
    ),
);

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
    ({ className, ...props }, ref) => (
        <ol
            ref={ref}
            className={cn("flex items-center gap-2", className)}
            {...props}
        />
    ),
);

BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
    ({ className, ...props }, ref) => (
        <li ref={ref} className={cn("", className)} {...props} />
    ),
);

BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ href = "#", className, ...props }, ref) => (
        <a
            ref={ref}
            href={href}
            className={cn(
                "text-text-secondary hover:text-accent transition-colors text-sm font-medium",
                className,
            )}
            {...props}
        />
    ),
);

BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
    ({ className, ...props }, ref) => (
        <li ref={ref} className={cn("text-text-muted flex items-center", className)} {...props}>
            <Icon name="ChevronRight" size={14} />
        </li>
    ),
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
};
