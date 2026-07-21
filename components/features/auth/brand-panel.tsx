import { Wordmark } from "@/components/ui/wordmark";
import { propertyImage } from "@/lib/config/sample-images";

/* ── testimonial ── */

function TrustQuote() {
    return (
        <figure className="border-highlight/50 border-l-2 pl-4">
            <blockquote className="text-sidebar-text-active font-display text-lg leading-relaxed font-light">
                &ldquo;The most discerning marketplace we&apos;ve listed with —
                every home feels genuinely curated.&rdquo;
            </blockquote>
            <figcaption className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-sidebar-text-active font-medium">
                    Anthony Sterling
                </span>
                <span className="text-sidebar-text">·</span>
                <span className="text-sidebar-text">Sterling &amp; Co.</span>
            </figcaption>
        </figure>
    );
}

/* ── brand panel ── */

export function BrandPanel() {
    return (
        <aside className="bg-sidebar relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
            <img
                src={propertyImage(3)}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 size-full object-cover"
            />
            <div
                aria-hidden="true"
                className="from-sidebar via-sidebar/85 to-sidebar/55 absolute inset-0 bg-gradient-to-t"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(var(--color-background)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,#000,transparent)] bg-[size:32px_32px] opacity-[0.05]"
            />
            <div
                aria-hidden="true"
                className="bg-highlight/20 pointer-events-none absolute -top-16 -right-16 size-72 rounded-full blur-3xl"
            />

            <div className="relative z-10">
                <Wordmark tone="dark" />
            </div>

            <div className="relative z-10 space-y-8">
                <h2 className="text-sidebar-text-active font-display text-h2 max-w-md leading-[1.1] font-light tracking-tight">
                    Where extraordinary homes find their owners.
                </h2>
                <TrustQuote />
            </div>
        </aside>
    );
}

BrandPanel.displayName = "BrandPanel";
