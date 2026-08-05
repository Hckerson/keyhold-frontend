"use client";

import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type HTMLAttributes,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";

const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EXIT_DURATION = 300;

const DrawerCloseContext = createContext<() => void>(() => {});

function activeElement() {
    const node = document.activeElement;
    return node instanceof HTMLElement ? node : null;
}

function lockScroll(origin: HTMLElement | null) {
    const targets: HTMLElement[] = [document.body];
    let node = origin?.parentElement ?? null;

    while (node && node !== document.body) {
        const { overflowY } = getComputedStyle(node);
        const scrolls = overflowY === "auto" || overflowY === "scroll";
        if (scrolls && node.scrollHeight > node.clientHeight) {
            targets.push(node);
            break;
        }
        node = node.parentElement;
    }

    const previous = targets.map(
        (target) => [target, target.style.overflow] as const,
    );
    for (const target of targets) target.style.overflow = "hidden";

    return () => {
        for (const [target, overflow] of previous)
            target.style.overflow = overflow;
    };
}

const drawerVariants = cva(
    "bg-background-muted border-border-dark ease-smooth fixed inset-y-0 right-0 z-40 flex w-full flex-col border-l shadow-2xl transition-transform duration-300 focus:outline-none",
    {
        variants: {
            size: {
                sm: "sm:max-w-sm",
                md: "sm:max-w-md",
                lg: "sm:max-w-xl",
            },
        },
        defaultVariants: { size: "md" },
    },
);

export interface DrawerProps
    extends
        HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof drawerVariants> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    label: string;
    children: ReactNode;
}

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
    (
        { open, onOpenChange, label, size, className, children, ...props },
        ref,
    ) => {
        const mounted = useMounted();
        const [rendered, setRendered] = useState(open);
        const [shown, setShown] = useState(false);
        const panelRef = useRef<HTMLDivElement | null>(null);
        const restoreRef = useRef<HTMLElement | null>(null);

        const close = useCallback(() => onOpenChange(false), [onOpenChange]);

        const setPanel = useCallback(
            (node: HTMLDivElement | null) => {
                panelRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
            },
            [ref],
        );

        useEffect(() => {
            if (open) {
                setRendered(true);
                const frame = requestAnimationFrame(() => setShown(true));
                return () => cancelAnimationFrame(frame);
            }

            setShown(false);
            const timer = setTimeout(() => setRendered(false), EXIT_DURATION);
            return () => clearTimeout(timer);
        }, [open]);

        useEffect(() => {
            const panel = panelRef.current;
            if (!open || !rendered || !panel) return;

            restoreRef.current = activeElement();
            const releaseScroll = lockScroll(restoreRef.current);
            const target = panel.querySelector<HTMLElement>(FOCUSABLE) ?? panel;
            target.focus();

            const onKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    close();
                    return;
                }
                if (event.key !== "Tab") return;

                const items = Array.from(
                    panel.querySelectorAll<HTMLElement>(FOCUSABLE),
                );
                const first = items[0];
                const last = items[items.length - 1];
                if (!first || !last) return;

                const active = activeElement();
                if (event.shiftKey && (active === first || active === panel)) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && active === last) {
                    event.preventDefault();
                    first.focus();
                }
            };

            document.addEventListener("keydown", onKeyDown);
            return () => {
                document.removeEventListener("keydown", onKeyDown);
                releaseScroll();
                restoreRef.current?.focus();
            };
        }, [open, rendered, close]);

        if (!mounted || !rendered) return null;

        return createPortal(
            <DrawerCloseContext.Provider value={close}>
                <div
                    aria-hidden="true"
                    onClick={close}
                    className={cn(
                        "bg-overlay ease-smooth fixed inset-0 z-30 transition-opacity duration-300",
                        shown ? "opacity-100" : "opacity-0",
                    )}
                />
                <div
                    ref={setPanel}
                    role="dialog"
                    aria-modal="true"
                    aria-label={label}
                    tabIndex={-1}
                    className={cn(
                        drawerVariants({ size }),
                        shown ? "translate-x-0" : "translate-x-full",
                        className,
                    )}
                    {...props}
                >
                    {children}
                </div>
            </DrawerCloseContext.Provider>,
            document.body,
        );
    },
);

Drawer.displayName = "Drawer";

const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const close = useContext(DrawerCloseContext);

        return (
            <div
                ref={ref}
                className={cn(
                    "border-border-dark flex items-start justify-between gap-3 border-b px-4 py-3",
                    className,
                )}
                {...props}
            >
                <div className="min-w-0">{children}</div>
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close panel"
                    className="text-text-muted hover:text-text hover:bg-background-alt focus-visible:ring-accent ease-smooth grid size-6 shrink-0 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <X size={12} strokeWidth={1.5} aria-hidden="true" />
                </button>
            </div>
        );
    },
);

DrawerHeader.displayName = "DrawerHeader";

const DrawerTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn("text-text truncate text-xs font-medium", className)}
        {...props}
    />
));

DrawerTitle.displayName = "DrawerTitle";

const DrawerBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("scroll-y flex-1 px-4 py-3", className)}
            {...props}
        />
    ),
);

DrawerBody.displayName = "DrawerBody";

const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "border-border-dark bg-background-alt flex flex-wrap items-center gap-2 border-t px-4 py-3",
                className,
            )}
            {...props}
        />
    ),
);

DrawerFooter.displayName = "DrawerFooter";

export { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter };
