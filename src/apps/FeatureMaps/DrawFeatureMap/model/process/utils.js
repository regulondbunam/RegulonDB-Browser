export function stringToNumber(value) {
    if (typeof value !== "string") return NaN;
    const trimmed = value.trim();
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
        return Number(trimmed);
    }
    return NaN;
}