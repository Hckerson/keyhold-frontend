import { Inter, Poppins } from "next/font/google";

const inter = Inter({
    fallback: ["system-ui", "arial"],
    subsets: ["latin"],
});

const poppins = Poppins({
    fallback: ["system-ui", "arial"],
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export { inter, poppins };
