import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => (
        <textarea
            ref={ref}
            className={cn(
                "font-body border-border bg-background-alt text-text placeholder:text-text-muted focus-visible:border-accent focus-visible:ring-accent/40 aria-invalid:border-error aria-invalid:focus-visible:ring-error/40 ease-smooth w-full resize-none rounded-md border px-2.5 py-2 text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        />
    ),
);

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
