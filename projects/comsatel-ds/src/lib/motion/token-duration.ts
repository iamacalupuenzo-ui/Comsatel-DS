// Lee un token de duración (--motion-duration-*) en tiempo real y lo
// convierte a segundos (formato que espera GSAP) — así una animación sigue
// un cambio de token sin quedar con un número duplicado en el componente.
export function tokenSeconds(el: HTMLElement, cssVar: string, fallbackMs = 100): number {
  const raw = getComputedStyle(el).getPropertyValue(cssVar).trim();
  const ms = parseFloat(raw);
  return (Number.isFinite(ms) ? ms : fallbackMs) / 1000;
}
