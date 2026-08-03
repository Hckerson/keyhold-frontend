import Image from "next/image";
import { Wordmark } from "@/components/brand/wordmark";
import styles from "@/components/features/auth/brand-panel.module.css";

const IMAGES = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80",
];

const WORDS: { text: string; ital?: boolean }[] = [
    { text: "Where" },
    { text: "extraordinary" },
    { text: "homes" },
    { text: "find their owners.", ital: true },
];

const TESTIMONIALS = [
    {
        quote: "Every home felt genuinely curated — not a listings feed.",
        name: "Anthony Sterling",
        firm: "Sterling & Co.",
    },
    {
        quote: "Discretion at every step. The Canyon House was ours in a week.",
        name: "Elena Voss",
        firm: "Private Client",
    },
    {
        quote: "A quiet, considered process. Exactly how it should feel.",
        name: "M. Laurent",
        firm: "Bel Air",
    },
];

export function BrandPanel() {
    return (
        <aside className="bg-sidebar relative hidden overflow-hidden p-12 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between">
            <div className={styles.stage} aria-hidden="true">
                {IMAGES.map((src) => (
                    <Image key={src} src={src} alt="" fill sizes="50vw" />
                ))}
            </div>
            <div className={styles.scrim} aria-hidden="true" />
            <div
                className={`${styles.aurora} ${styles.a1}`}
                aria-hidden="true"
            />
            <div
                className={`${styles.aurora} ${styles.a2}`}
                aria-hidden="true"
            />
            <div
                className={`${styles.aurora} ${styles.a3}`}
                aria-hidden="true"
            />
            <div className={styles.grain} aria-hidden="true" />

            <div className={`${styles.reveal} relative z-10`}>
                <Wordmark tone="dark" size="md" />
            </div>

            <div className="relative z-10">
                <p className={styles.eyebrow}>Members&apos; Entrance</p>
                <h2 className={styles.headline}>
                    {WORDS.map((word) => (
                        <span
                            key={word.text}
                            className={word.ital ? styles.ital : undefined}
                        >
                            {word.text}
                        </span>
                    ))}
                </h2>

                <div className={styles.rot}>
                    {TESTIMONIALS.map((testimonial, position) => (
                        <figure
                            key={testimonial.name}
                            aria-hidden={position > 0 || undefined}
                        >
                            <blockquote>
                                &ldquo;{testimonial.quote}&rdquo;
                            </blockquote>
                            <figcaption>
                                <b>{testimonial.name}</b> · {testimonial.firm}
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <div className={styles.dots} aria-hidden="true">
                    {TESTIMONIALS.map((testimonial) => (
                        <i key={testimonial.name} />
                    ))}
                </div>
            </div>
        </aside>
    );
}

BrandPanel.displayName = "BrandPanel";
