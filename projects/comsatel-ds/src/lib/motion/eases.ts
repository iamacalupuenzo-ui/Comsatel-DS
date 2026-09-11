import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// Mismas curvas que --motion-easing-* (tokens.css) — GSAP no acepta un
// cubic-bezier crudo como `ease`, hace falta registrarla como CustomEase.
// Registro único para todo el sistema: cualquier componente que anime con
// GSAP importa esto en vez de registrar su propio nombre (evitar registrar
// el mismo nombre dos veces).
export const EASE_DEFAULT = CustomEase.create('csMotionDefault', '0.2, 0, 0, 1');
export const EASE_ENTER = CustomEase.create('csMotionEnter', '0, 0, 0.2, 1');
export const EASE_EXIT = CustomEase.create('csMotionExit', '0.2, 0, 1, 0.9');
export const EASE_SPRING = CustomEase.create('csMotionSpring', '0.15, 1.15, 0.6, 1');
