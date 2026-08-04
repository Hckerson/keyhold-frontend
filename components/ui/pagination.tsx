import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface PaginationListProps extends HTMLAttributes<HTMLUListElement> {
    children: ReactNode;
}

interface PaginationItemProps extends HTMLAttributes<HTMLLIElement> {
    children: ReactNode;
}

interface PaginationLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    isActive?: boolean;
    href?: string;
    children: ReactNode;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex justify-center", className)}
            {...props}
        />
    ),
);

Pagination.displayName = "Pagination";

const PaginationList = forwardRef<HTMLUListElement, PaginationListProps>(
    ({ className, ...props }, ref) => (
        <ul ref={ref} className={cn("flex gap-1.5", className)} {...props} />
    ),
);

PaginationList.displayName = "PaginationList";

const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
    ({ className, ...props }, ref) => (
        <li ref={ref} className={cn("", className)} {...props} />
    ),
);

PaginationItem.displayName = "PaginationItem";

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
    ({ isActive, href = "#", className, ...props }, ref) => (
        <a
            ref={ref}
            href={href}
            className={cn(
                "border-border ease-smooth grid h-8 min-w-8 place-items-center rounded-md border px-2 text-xs font-medium tabular-nums transition-colors duration-200",
                isActive
                    ? "bg-accent text-text-inverse border-accent"
                    : "text-text-secondary hover:border-border-dark hover:bg-background-muted hover:text-text",
                className,
            )}
            {...props}
        />
    ),
);

PaginationLink.displayName = "PaginationLink";

export { Pagination, PaginationList, PaginationItem, PaginationLink };
