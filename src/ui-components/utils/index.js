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

function generateRandomPastelColor(opacity=1) {
  let r = Math.floor(Math.random() * 128) + 127;
  let g = Math.floor(Math.random() * 128) + 127;
  let b = Math.floor(Math.random() * 128) + 127;
  let a = opacity

  let hr = r.toString(16).padStart(2, '0');
  let hg = g.toString(16).padStart(2, '0');
  let hb = b.toString(16).padStart(2, '0');

  return { r, g, b, a, 
    toRGBA:`rgba(${r}, ${g}, ${b}, ${a})`,
    toRGB:`rgb(${r}, ${g}, ${b})`,
    toHex: `#${hr}${hg}${hb}`,
  };
}

function colorDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
    Math.pow(color1.g - color2.g, 2) +
    Math.pow(color1.b - color2.b, 2)
  );
}

function getContrastColor(hexColor) {
  // Asegurar que el color está en formato hexadecimal de 6 caracteres
  if (hexColor.length === 4) {
      hexColor = `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`;
  }

  // Convertir el color hexadecimal a RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Calcular la luminosidad relativa
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Si la luminosidad es alta, usar texto negro, si no, usar texto blanco
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

function generateUniquePastelColor(existingColors, minDistance = 100, opacity = 1) {
  let color = null;
  while (color === null) {
    let newColor = generateRandomPastelColor(opacity);
    if (!existingColors.find(c => colorDistance(c, newColor) < minDistance)) {
      color = newColor;
    }
  }
  return color;
}

const rgbaToHex = (rgba) => {
  const rgbaMatch = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d*)?\)/);
  if (!rgbaMatch) {
      throw new Error('Formato de color no soportado');
  }

  let r = parseInt(rgbaMatch[1]);
  let g = parseInt(rgbaMatch[2]);
  let b = parseInt(rgbaMatch[3]);

  let hr = r.toString(16).padStart(2, '0');
  let hg = g.toString(16).padStart(2, '0');
  let hb = b.toString(16).padStart(2, '0');

  return `#${hr}${hg}${hb}`;
};

export { DataVerifier, LocalStorage, markMatches, generateRandomString, generateRandomPastelColor, generateUniquePastelColor, getContrastColor }