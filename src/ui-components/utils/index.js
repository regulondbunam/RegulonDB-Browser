import LocalStorage from "./LocalStorage";
import DataVerifier from "./DataVerifier";
import markMatches from "./markMatches";

function generateRandomString(length = 5) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function generateRandomPastelColor() {
  let r = Math.floor(Math.random() * 128) + 127;
  let g = Math.floor(Math.random() * 128) + 127;
  let b = Math.floor(Math.random() * 128) + 127;
  let a = 0.5; // 50% transparencia
  return { r, g, b, a, toRGBA:`rgba(${r}, ${g}, ${b}, ${a})`,toRGB:`rgb(${r}, ${g}, ${b})`};
}

function colorDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
    Math.pow(color1.g - color2.g, 2) +
    Math.pow(color1.b - color2.b, 2)
  );
}

function generateUniquePastelColor(existingColors, minDistance = 100) {
  let color = null;
  while (color === null) {
    let newColor = generateRandomPastelColor();
    if (!existingColors.find(c => colorDistance(c, newColor) < minDistance)) {
      color = newColor;
    }
  }
  return color;
}

export { DataVerifier, LocalStorage, markMatches, generateRandomString, generateRandomPastelColor, generateUniquePastelColor }