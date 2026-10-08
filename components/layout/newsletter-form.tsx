"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Send } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { NEWSLETTER_FORM_COPY as COPY } from "@/lib/config/newsletter";
import { useSubscribeNewsletter } from "@/lib/hooks/use-newsletter";
import { newsletterSignupSchema } from "@/lib/validations/newsletter";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [invalid, setInvalid] = useState<string | null>(null);
    const { submit, pending, sent, error, clearError } =
        useSubscribeNewsletter();
    const inputId = useId();
    const consentId = useId();
    const statusId = useId();
    const problem = invalid ?? error;

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;
        const parsed = newsletterSignupSchema.safeParse({ email });
        if (!parsed.success) {
            setInvalid(parsed.error.issues[0]?.message ?? COPY.failure);
            return;
        }
        setInvalid(null);
        submit(parsed.data, { onSuccess: () => setEmail("") });
    };

    const onChange = (value: string) => {
        setEmail(value);
        setInvalid(null);
        if (error) clearError();
    };

    return (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
            <label
                htmlFor={inputId}
                className="text-sidebar-text-muted font-mono text-[10px] tracking-[0.14em] uppercase"
            >
                {COPY.label}
            </label>
            <div className="border-sidebar-border flex items-center gap-2 rounded-full border px-3 py-1.5">
                <input
                    id={inputId}
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={COPY.placeholder}
                    aria-invalid={problem ? true : undefined}
                    aria-describedby={`${consentId} ${statusId}`}
                    className="text-sidebar-text-active placeholder:text-sidebar-text-muted min-w-0 flex-1 bg-transparent text-xs outline-none"
                />
                <button
                    type="submit"
                    disabled={pending}
                    aria-busy={pending}
                    aria-label={COPY.submit}
                    className="text-accent-soft hover:text-accent-light focus-visible:ring-accent-soft ease-smooth grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
                >
                    {pending ? (
                        <Spinner
                            size="sm"
                            tone="current"
                            className="size-3.5"
                        />
                    ) : (
                        <Send size={14} strokeWidth={1.5} aria-hidden="true" />
                    )}
                </button>
            </div>
            <p id={consentId} className="text-sidebar-text-muted text-xs">
                {COPY.consent}{" "}
                <Link
                    href={COPY.privacyHref}
                    className="hover:text-sidebar-text-active focus-visible:ring-sidebar-text-active ease-smooth underline underline-offset-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    {COPY.privacy}
                </Link>
            </p>
            <p
                id={statusId}
                role={problem ? "alert" : "status"}
                className="flex items-center gap-1.5 text-xs empty:hidden"
            >
                {problem ? (
                    <span className="text-error">{problem}</span>
                ) : (
                    sent && (
                        <>
                            <Check
                                size={12}
                                strokeWidth={1.5}
                                aria-hidden="true"
                                className="text-accent-soft shrink-0"
                            />
                            <span className="text-sidebar-text">
                                {COPY.sent}
                            </span>
                        </>
                    )
                )}
            </p>
        </form>
    );
}

NewsletterForm.displayName = "NewsletterForm";
