const PASSWORD_ALPHABET =
    "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%&*";

export const generatePassword = (length: number) =>
    Array.from(
        crypto.getRandomValues(new Uint32Array(length)),
        (value) => PASSWORD_ALPHABET[value % PASSWORD_ALPHABET.length],
    ).join("");
