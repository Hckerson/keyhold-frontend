import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const GLYPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="104" height="104"><path d="M5 3.6H13V5.4H10.6V18.2H17V16.2H19V20.6H5V18.2H7.4V5.4H5Z" fill="#b08d57" fill-rule="evenodd" clip-rule="evenodd"/></svg>`;

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#1f4e3d",
                }}
            >
                <img
                    alt=""
                    width={104}
                    height={104}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(GLYPH)}`}
                />
            </div>
        ),
        size,
    );
}
