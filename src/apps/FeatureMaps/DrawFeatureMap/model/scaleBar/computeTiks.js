import classifyTick from "./classifyTick";

export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

export default function computeTicks({
                               px_bp,
                               sizeSection,
                               startPosition,
                               step = 10,         // cada cuánto dibujar ticks
                               labelEvery = 100,  // cada cuánto poner etiqueta (fallback)
                               measure,           // frecuencia de etiqueta proveniente de VM
                             }) {
  if (!px_bp || !sizeSection) return [];
  const ticks = [];
  const labelStep = Number.isFinite(measure) && measure > 0 ? measure : labelEvery;

  // Iteramos sólo en múltiplos de 'step'
  for (let i = 0; i <= sizeSection; i += step) {
    const x = round2(px_bp * i);
    // lógica de etiqueta:
    const label = startPosition < 0 ? startPosition + i : startPosition - i;

    const kind = classifyTick(i, label);
    const showLabel = i % labelStep === 0;

    ticks.push({ i, x, label, kind, showLabel });
  }
  return ticks;
}

