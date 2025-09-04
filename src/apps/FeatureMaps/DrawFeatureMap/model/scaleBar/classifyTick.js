/**
 * Regresa la clase del tick según su tipo.
 * @param {number} i - índice (unidades)
 * @param {number} label - valor de etiqueta calculado
 * @returns {'zero'|'major'|'mid'|'minor'}
 */
export default function classifyTick(i, label) {
  if (label === 0) return 'zero';
  if (i % 100 === 0) return 'major';
  if (i % 50 === 0) return 'mid';
  return 'minor';
}