"use client";

import {
    useEffect,
    useId,
    useRef,
    useState,
    type KeyboardEvent,
} from "react";
import { Check, ChevronDown, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const OPEN_KEYS = ["ArrowDown", "ArrowUp", "Enter", " "];

const triggerVariants = cva(
    "border-border bg-background-alt text-text hover:border-border-dark focus-visible:border-accent focus-visible:ring-accent/40 ease-smooth flex w-full items-center gap-2 rounded-lg border text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            size: {
                sm: "h-8 px-2.5 text-xs",
                md: "h-9 px-3 text-sm",
            },
        },
        defaultVariants: { size: "md" },
    },
);

const optionVariants = cva(
    "ease-smooth flex cursor-pointer items-center justify-between gap-2 rounded-md transition-colors duration-200",
    {
        variants: {
            size: {
                sm: "h-7 px-2 text-xs",
                md: "h-8 px-2.5 text-sm",
            },
        },
        defaultVariants: { size: "md" },
    },
);

export interface SelectOption<T extends string> {
    value: T;
    label: string;
}

export interface SelectProps<T extends string>
    extends VariantProps<typeof triggerVariants> {
    options: readonly SelectOption<T>[];
    value: T;
    onChange: (next: T) => void;
    label: string;
    icon?: LucideIcon;
    align?: "start" | "end";
    disabled?: boolean;
    className?: string;
}

export function Select<T extends string>({
    options,
    value,
    onChange,
    label,
    icon: Icon,
    align = "start",
    disabled,
    size,
    className,
}: SelectProps<T>) {
    const listId = useId();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const [open, setOpen] = useState(false);
    const [shown, setShown] = useState(false);

    const selectedIndex = options.findIndex((option) => option.value === value);
    const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0));
    const selected = options[selectedIndex];

    useEffect(() => {
        if (!open) {
            setShown(false);
            return;
        }
        const frame = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(frame);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target;
            if (target instanceof Node && rootRef.current?.contains(target))
                return;
            setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        listRef.current
            ?.querySelector('[data-active="true"]')
            ?.scrollIntoView({ block: "nearest" });
    }, [open, activeIndex]);

    const optionId = (index: number) => `${listId}-option-${index}`;

    const openList = () => {
        setActiveIndex(Math.max(selectedIndex, 0));
        setOpen(true);
    };

    const commit = (index: number) => {
        const option = options[index];
        if (!option) return;
        onChange(option.value);
        setOpen(false);
    };

    const move = (delta: number) => {
        setActiveIndex((current) => {
            const next = current + delta;
            if (next < 0) return options.length - 1;
            if (next >= options.length) return 0;
            return next;
        });
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Escape" || event.key === "Tab") {
            setOpen(false);
            return;
        }

        if (!open) {
            if (!OPEN_KEYS.includes(event.key)) return;
            event.preventDefault();
            openList();
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            move(1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            move(-1);
        } else if (event.key === "Home") {
            event.preventDefault();
            setActiveIndex(0);
        } else if (event.key === "End") {
            event.preventDefault();
            setActiveIndex(options.length - 1);
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            commit(activeIndex);
        }
    };

    return (
        <div ref={rootRef} className={cn("relative shrink-0", className)}>
            <button
                type="button"
                role="combobox"
                aria-label={label}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={open ? optionId(activeIndex) : undefined}
                disabled={disabled}
                onClick={() => (open ? setOpen(false) : openList())}
                onKeyDown={onKeyDown}
                className={cn(
                    triggerVariants({ size }),
                    open && "border-accent",
                )}
            >
                {Icon && (
                    <Icon
                        size={12}
                        strokeWidth={1.5}
                        className="text-text-muted shrink-0"
                    />
                )}
                <span className="flex-1 truncate">{selected?.label}</span>
                <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    className={cn(
                        "text-text-muted ease-smooth shrink-0 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            {open && (
                <ul
                    ref={listRef}
                    id={listId}
                    role="listbox"
                    aria-label={label}
                    className={cn(
                        "border-border bg-background-alt ease-smooth absolute top-full z-30 mt-1 max-h-64 min-w-full overflow-y-auto rounded-lg border p-1 shadow-lg transition duration-200",
                        align === "end" ? "right-0" : "left-0",
                        shown
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-1 opacity-0",
                    )}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            id={optionId(index)}
                            role="option"
                            aria-selected={option.value === value}
                            data-active={index === activeIndex}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => commit(index)}
                            className={cn(
                                optionVariants({ size }),
                                index === activeIndex
                                    ? "bg-background-muted text-text"
                                    : "text-text-secondary",
                                option.value === value && "font-medium",
                            )}
                        >
                            <span className="truncate">{option.label}</span>
                            {option.value === value && (
                                <Check
                                    size={12}
                                    strokeWidth={1.5}
                                    className="text-accent shrink-0"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

Select.displayName = "Select";
