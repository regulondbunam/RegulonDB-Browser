import en from './en.json';

/**
 * Obtiene un valor del objeto de traducciones usando una ruta por puntos.
 * Soporta índices de arreglo: "list[0].title"
 * @param {string} key - Ruta tipo "a.b.c" o "a[0].b"
 * @param {object} dict - Diccionario fuente (por defecto en.json)
 * @param {string} fallback - Valor por defecto si no se encuentra
 * @returns {string} Texto encontrado o fallback
 */
export default function getText(key, dict = en, fallback = '') {
  if (!key || typeof key !== 'string') return fallback;

  // Convierte "arr[0].x" a "arr.0.x" y separa por puntos
  const parts = key
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);

  let cur = dict;
  for (const p of parts) {
    if (cur != null && Object.prototype.hasOwnProperty.call(cur, p)) {
      cur = cur[p];
    } else {
      return fallback;
    }
  }

  // Regresa texto/num; si es objeto/array, devuelve fallback
  return (typeof cur === 'string' || typeof cur === 'number') ? String(cur) : fallback;
}
