import { JoinCanvas } from "@/components/features/auth/join/join-canvas";
import { JoinFlow } from "@/components/features/auth/join/join-flow";

export const metadata = {
    title: "Begin your application | Luxury Real Estate",
    description:
        "Apply for access to the marketplace — as a buyer seeking a residence, or an agent presenting one.",
};

export default function SignupPage() {
    return (
        <JoinCanvas>
            <JoinFlow />
        </JoinCanvas>
    );
}
