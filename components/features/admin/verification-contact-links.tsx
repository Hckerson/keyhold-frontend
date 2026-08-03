import { Mail, Phone } from "lucide-react";

export interface VerificationContactLinksProps {
    email: string;
    phone: string;
}

const linkClass =
    "text-text-secondary hover:text-accent ease-smooth flex items-center gap-1 text-xs transition-colors";

export function VerificationContactLinks({
    email,
    phone,
}: VerificationContactLinksProps) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href={`mailto:${email}`} className={linkClass}>
                <Mail
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0"
                />
                {email}
            </a>
            <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className={linkClass}
            >
                <Phone
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0"
                />
                {phone}
            </a>
        </div>
    );
}

VerificationContactLinks.displayName = "VerificationContactLinks";
