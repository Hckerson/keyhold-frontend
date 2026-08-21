const JSON_MIME = "application/json";
const JSON_INDENT = 2;

export function downloadJson(payload: unknown, filename: string) {
    const blob = new Blob([JSON.stringify(payload, null, JSON_INDENT)], {
        type: JSON_MIME,
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
