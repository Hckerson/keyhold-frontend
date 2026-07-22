export interface AuthHeadingProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
}

export function AuthHeading({ eyebrow, title, subtitle }: AuthHeadingProps) {
    return (
        <header>
            {eyebrow && (
                <p className="text-text-muted font-mono text-[11px] tracking-[0.1em] uppercase">
                    {eyebrow}
                </p>
            )}
            <h1 className="font-display text-text mt-2 text-[28px] leading-[1.1] font-light">
                {title}
            </h1>
            {subtitle && (
                <p className="text-text-secondary mt-1.5 text-[14px]">
                    {subtitle}
                </p>
            )}
        </header>
    );
}

AuthHeading.displayName = "AuthHeading";
