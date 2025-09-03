export function stringToNumber(value) {
    if (typeof value !== "string") return NaN;
    const trimmed = value.trim();
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
        return Number(trimmed);
    }
    return NaN;
}

export function getRandomBrightColorHex() {
  const r = Math.floor(Math.random() * 256); // Rango de 0 a 255
  const g = Math.floor(Math.random() * 256); // Rango de 0 a 255
  const b = Math.floor(Math.random() * 256); // Rango de 0 a 255

  // Convertir a formato hexadecimal
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  return hex;
}