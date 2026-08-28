import { describe, expect, it } from "vitest";
import { toCsv } from "@/lib/utils/download";

const CRLF = "\r\n";

describe("toCsv", () => {
    it("emits a header row followed by one row per record", () => {
        const csv = toCsv([
            {
                columns: ["Reference", "Price"],
                rows: [
                    ["TX-1", 400],
                    ["TX-2", 900],
                ],
            },
        ]);

        expect(csv).toBe(
            ["Reference,Price", "TX-1,400", "TX-2,900"].join(CRLF),
        );
    });

    it("quotes cells containing a comma so columns stay aligned", () => {
        const csv = toCsv([
            { columns: ["Address"], rows: [["12 Elm St, Boston"]] },
        ]);

        expect(csv).toBe(["Address", '"12 Elm St, Boston"'].join(CRLF));
    });

    it("doubles embedded quotes so the value survives a round trip", () => {
        const csv = toCsv([{ columns: ["Note"], rows: [['He said "yes"']] }]);

        expect(csv).toBe(["Note", '"He said ""yes"""'].join(CRLF));
    });

    it("quotes cells containing a newline so the row is not split", () => {
        const csv = toCsv([
            { columns: ["Note"], rows: [["line one\nline two"]] },
        ]);

        expect(csv).toBe(["Note", '"line one\nline two"'].join(CRLF));
    });

    it("renders null and undefined as empty cells rather than the words", () => {
        const csv = toCsv([{ columns: ["A", "B"], rows: [[null, undefined]] }]);

        expect(csv).toBe(["A,B", ","].join(CRLF));
    });

    it("separates sections with a blank line and titles each one", () => {
        const csv = toCsv([
            { title: "Regions", columns: ["Region"], rows: [["East"]] },
            { title: "Trend", columns: ["Month"], rows: [["Jan"]] },
        ]);

        expect(csv).toBe(
            ["Regions", "Region", "East", "", "Trend", "Month", "Jan"].join(
                CRLF,
            ),
        );
    });

    it("omits the title line for a section that has no title", () => {
        const csv = toCsv([{ columns: ["Region"], rows: [["East"]] }]);

        expect(csv).toBe(["Region", "East"].join(CRLF));
    });
});
