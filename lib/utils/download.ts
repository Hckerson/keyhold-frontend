const JSON_MIME = "application/json";
const CSV_MIME = "text/csv;charset=utf-8";
const JSON_INDENT = 2;
const CSV_NEWLINE = "\r\n";
const CSV_QUOTED = /[",\r\n]/;

export type CsvValue = string | number | boolean | null | undefined;

export interface CsvSection {
    title?: string;
    columns: readonly string[];
    rows: readonly (readonly CsvValue[])[];
}

const save = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
};

export function downloadJson(payload: unknown, filename: string) {
    save(
        new Blob([JSON.stringify(payload, null, JSON_INDENT)], {
            type: JSON_MIME,
        }),
        filename,
    );
}

const csvCell = (value: CsvValue) => {
    const text = value === null || value === undefined ? "" : String(value);
    return CSV_QUOTED.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const csvLine = (row: readonly CsvValue[]) => row.map(csvCell).join(",");

const csvSection = (section: CsvSection) =>
    [
        ...(section.title ? [csvLine([section.title])] : []),
        csvLine(section.columns),
        ...section.rows.map(csvLine),
    ].join(CSV_NEWLINE);

export const toCsv = (sections: readonly CsvSection[]) =>
    sections.map(csvSection).join(CSV_NEWLINE.repeat(2));

export function downloadCsv(sections: readonly CsvSection[], filename: string) {
    save(new Blob([toCsv(sections)], { type: CSV_MIME }), filename);
}
