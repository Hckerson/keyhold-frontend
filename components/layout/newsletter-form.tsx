"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail("");
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-2">
            <label
                htmlFor="newsletter-email"
                className="text-sidebar-text-muted font-mono text-[10px] tracking-[0.14em] uppercase"
            >
                The private list
            </label>
            <div className="border-sidebar-border flex items-center gap-2 rounded-full border px-3 py-1.5">
                <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="text-sidebar-text-active placeholder:text-sidebar-text-muted min-w-0 flex-1 bg-transparent text-xs outline-none"
                />
                <button
                    type="submit"
                    aria-label="Subscribe to the newsletter"
                    className="text-highlight hover:text-highlight-light focus-visible:ring-highlight ease-smooth grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Send size={14} strokeWidth={1.5} />
                </button>
            </div>
            <p className="text-sidebar-text-muted flex items-center gap-1.5 text-xs">
                {subscribed ? (
                    <>
                        <Check
                            size={12}
                            strokeWidth={1.5}
                            className="text-highlight shrink-0"
                        />
                        You are on the list. Off-market notes only.
                    </>
                ) : (
                    "Off-market notes, twice a month. No listings feed."
                )}
            </p>
        </form>
    );
}

NewsletterForm.displayName = "NewsletterForm";
