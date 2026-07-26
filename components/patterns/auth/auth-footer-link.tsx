import Link from "next/link";

export interface AuthFooterLinkProps {
    prompt: string;
    href: string;
    label: string;
}

export function AuthFooterLink({ prompt, href, label }: AuthFooterLinkProps) {
    return (
        <p className="text-text-secondary text-xs">
            {prompt}{" "}
            <Link
                href={href}
                className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth rounded-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                {label}
            </Link>
        </p>
    );
}

AuthFooterLink.displayName = "AuthFooterLink";
