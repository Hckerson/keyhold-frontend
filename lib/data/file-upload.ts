const BYTES_PER_UNIT = 1024;
const UNITS = ["B", "KB", "MB", "GB"];
const DECIMALS = 1;

export const formatBytes = (bytes: number) => {
    if (bytes === 0) return `0 ${UNITS[0]}`;

    const exponent = Math.min(
        Math.floor(Math.log(bytes) / Math.log(BYTES_PER_UNIT)),
        UNITS.length - 1,
    );
    const value = bytes / BYTES_PER_UNIT ** exponent;

    return `${exponent === 0 ? value : value.toFixed(DECIMALS)} ${UNITS[exponent]}`;
};

export const acceptsFile = (file: File, accept?: string) => {
    if (!accept) return true;

    return accept
        .split(",")
        .map((token) => token.trim())
        .filter(Boolean)
        .some((token) =>
            token.endsWith("/*")
                ? file.type.startsWith(token.slice(0, -1))
                : token.startsWith(".")
                  ? file.name.toLowerCase().endsWith(token.toLowerCase())
                  : file.type === token,
        );
};

export interface FileScreening {
    accepted: File[];
    rejected: string[];
}

export const screenFiles = (
    files: File[],
    accept: string | undefined,
    maxSize: number | undefined,
): FileScreening =>
    files.reduce<FileScreening>(
        (result, file) => {
            if (!acceptsFile(file, accept)) {
                result.rejected.push(`${file.name} is not a supported type`);
                return result;
            }

            if (maxSize !== undefined && file.size > maxSize) {
                result.rejected.push(
                    `${file.name} is larger than ${formatBytes(maxSize)}`,
                );
                return result;
            }

            result.accepted.push(file);
            return result;
        },
        { accepted: [], rejected: [] },
    );
