export interface AuthFormHeaderProps {
    title: string;
    description?: string;
}

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
    return (
        <header className="flex flex-col gap-2">
            <h1 className="font-display text-h5 text-text font-light">
                {title}
            </h1>
            {description && (
                <p className="text-text-secondary max-w-[48ch] text-xs">
                    {description}
                </p>
            )}
        </header>
    );
}

AuthFormHeader.displayName = "AuthFormHeader";
