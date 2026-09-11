export interface PageIntroProps {
    eyebrow: string;
    title: string;
    lede: string;
    meta?: string;
}

export function PageIntro({ eyebrow, title, lede, meta }: PageIntroProps) {
    return (
        <header className="max-w-[60ch]">
            <p className="micro-label">{eyebrow}</p>
            <h1 className="text-h3 font-display text-text mt-3 font-light">
                {title}
            </h1>
            <p className="text-text-secondary mt-4 text-lg leading-relaxed">
                {lede}
            </p>
            {meta && <p className="micro-label mt-4">{meta}</p>}
        </header>
    );
}

PageIntro.displayName = "PageIntro";
