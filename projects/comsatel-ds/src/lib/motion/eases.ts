import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const easeCache = new Map<string, gsap.EaseFunction>();

/** Lee una curva --motion-easing-* resuelta en el elemento y la adapta a
 * GSAP. El cache se indexa por la curva resultante, no por el token: así no
 * se vuelve a registrar la misma CustomEase y un tema o token actualizado se
 * refleja en la siguiente animación. */
export function tokenEase(el: HTMLElement, cssVar: string, fallback: string): gsap.EaseFunction {
  const curve = getComputedStyle(el).getPropertyValue(cssVar).trim() || fallback;
  const cached = easeCache.get(curve);
  if (cached) return cached;

  const controls = curve.replace(/^cubic-bezier\(/, '').replace(/\)$/, '');
  const ease = CustomEase.create(`csMotionEase${easeCache.size}`, controls);
  easeCache.set(curve, ease);
  return ease;
}
