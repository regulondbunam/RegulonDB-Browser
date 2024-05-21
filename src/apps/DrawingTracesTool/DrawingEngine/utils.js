export function toNumber(input) {
  if (typeof input !== "string") {
    return null
  }
  const cleanedString = input.replace(/\+/g, '');
  const number = Number(cleanedString);
  if (isNaN(number)) {
    return null
  }
  return number;
}
