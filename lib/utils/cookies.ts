export const setCookie = (
    name: string,
    value: string,
    days: number | null = 7,
) => {
    if (typeof document === "undefined") return;

    let expires = "";
    if (days !== null) {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `;expires=${expiryDate.toUTCString()}`;
    }

    const secure = window.location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `${name}=${encodeURIComponent(
        value,
    )}${expires};path=/;SameSite=Lax${secure}`;
};

export const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
};

export const deleteCookie = (name: string) => {
    if (typeof document === "undefined") return;
    setCookie(name, "", -1);
};
