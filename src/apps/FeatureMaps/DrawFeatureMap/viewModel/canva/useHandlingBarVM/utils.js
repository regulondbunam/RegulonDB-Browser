export function getPosition(event, rect) {
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}