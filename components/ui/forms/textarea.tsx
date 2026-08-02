import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => (
        <textarea
            ref={ref}
            className={cn(
                "font-body bg-background-muted text-text border-border focus:border-accent focus:ring-accent/20 placeholder:text-text-muted w-full resize-none rounded-sm border px-4 py-3 text-base transition-all duration-200 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        />
    ),
);

Textarea.displayName = "Textarea";

export { Textarea };
