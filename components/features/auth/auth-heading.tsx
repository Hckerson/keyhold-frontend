export interface AuthHeadingProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
}

export function AuthHeading({ eyebrow, title, subtitle }: AuthHeadingProps) {
    return (
        <header className="space-y-2">
            {eyebrow && (
                <p className="text-text-muted font-mono text-[11px] tracking-wide uppercase">
                    {eyebrow}
                </p>
            )}
            <h1 className="font-display text-text text-h4 font-light">
                {title}
            </h1>
            {subtitle && (
                <p className="text-text-secondary text-sm">{subtitle}</p>
            )}
        </header>
    );
}

AuthHeading.displayName = "AuthHeading";
