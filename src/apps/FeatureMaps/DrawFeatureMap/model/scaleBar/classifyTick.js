/**
 * Regresa la clase del tick según su tipo.
 * @returns {'zero'|'major'|'mid'|'minor'}
 * @param xBp
 */
export default function classifyTick(xBp) {
  if (xBp === 0) return 'zero';
  if (xBp % 100 === 0) return 'major';
  if (xBp % 50 === 0) return 'mid';
  return 'minor';
}