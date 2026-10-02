import { forwardRef, type ComponentProps, type HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PAGINATION_LABEL = "Pagination";

interface PaginationLinkProps extends ComponentProps<typeof Link> {
    isActive?: boolean;
}

const Pagination = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
    ({ "aria-label": label = PAGINATION_LABEL, className, ...props }, ref) => (
        <nav
            ref={ref}
            aria-label={label}
            className={cn("flex justify-center", className)}
            {...props}
        />
    ),
);

Pagination.displayName = "Pagination";

const PaginationList = forwardRef<
    HTMLUListElement,
    HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
    />
));

PaginationList.displayName = "PaginationList";

const PaginationItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
    (props, ref) => <li ref={ref} {...props} />,
);

PaginationItem.displayName = "PaginationItem";

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
    ({ isActive, className, ...props }, ref) => (
        <Link
            ref={ref}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                "focus-visible:ring-accent ease-smooth grid h-8 min-w-8 place-items-center rounded-md border px-2 text-xs font-medium tabular-nums transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                isActive
                    ? "bg-accent text-text-inverse border-accent"
                    : "border-border text-text-secondary hover:border-border-dark hover:bg-background-muted hover:text-text",
                className,
            )}
            {...props}
        />
    ),
);

PaginationLink.displayName = "PaginationLink";

export { Pagination, PaginationList, PaginationItem, PaginationLink };
