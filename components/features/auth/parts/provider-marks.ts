import type { ComponentType, SVGProps } from "react";
import { FacebookMark } from "@/components/features/auth/parts/facebook-mark";
import { GoogleMark } from "@/components/features/auth/parts/google-mark";

export const PROVIDER_MARKS: Record<
    string,
    ComponentType<Pick<SVGProps<SVGSVGElement>, "className">>
> = {
    google: GoogleMark,
    facebook: FacebookMark,
};
