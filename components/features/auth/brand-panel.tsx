import Image from "next/image";
import { Wordmark } from "@/components/brand/wordmark";
import styles from "@/components/features/auth/brand-panel.module.css";
import { SIGN_IN_GUARANTEES } from "@/lib/data/platform-guarantees";

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
                    {SIGN_IN_GUARANTEES.map((guarantee, position) => (
                        <figure
                            key={guarantee.id}
                            aria-hidden={position > 0 || undefined}
                        >
                            <p>{guarantee.statement}</p>
                            <figcaption>
                                <b>{guarantee.label}</b> · {guarantee.detail}
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <div className={styles.dots} aria-hidden="true">
                    {SIGN_IN_GUARANTEES.map((guarantee) => (
                        <i key={guarantee.id} />
                    ))}
                </div>
            </div>
        </aside>
    );
}

BrandPanel.displayName = "BrandPanel";
