import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { gsap } from 'gsap';
import { EASE_DEFAULT, EASE_ENTER, EASE_EXIT, EASE_SPRING } from './eases';
import { tokenSeconds } from './token-duration';

export type MotionPreset = 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
export type MotionDurationToken = 'fast' | 'leaving' | 'medium' | 'entering' | 'slow';
export type MotionEasingToken = 'default' | 'enter' | 'exit' | 'spring';

interface PresetState {
  opacity: number;
  scale?: number;
  x?: number;
  y?: number;
}

const PRESETS: Record<MotionPreset, { hidden: PresetState; visible: PresetState }> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } },
  'slide-up': { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } },
  'slide-down': { hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } },
  'slide-left': { hidden: { opacity: 0, x: 8 }, visible: { opacity: 1, x: 0 } },
  'slide-right': { hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } },
};

// Duraciones de --motion-duration-* (tokens.css) usadas como fallback si el
// elemento todavía no resuelve la custom property (ver tokenSeconds).
const DURATION_MS: Record<MotionDurationToken, number> = {
  fast: 100,
  leaving: 150,
  medium: 200,
  entering: 250,
  slow: 350,
};

const EASES: Record<MotionEasingToken, gsap.EaseFunction> = {
  default: EASE_DEFAULT,
  enter: EASE_ENTER,
  exit: EASE_EXIT,
  spring: EASE_SPRING,
};

/**
 * Primitivo de animación de entrada/salida: envuelve contenido proyectado y
 * lo anima según `show`, siempre a partir de los tokens --motion-duration-*
 * y --motion-easing-* (nunca un número suelto). Un preset elige QUÉ anima
 * (fade, scale, slide-*); enter/exit duration y easing eligen CUÁNTO tarda
 * y CÓMO acelera.
 *
 * A diferencia de la referencia React (que desmonta el contenido recién
 * después de la salida animada gracias a AnimatePresence), acá el contenido
 * proyectado por <ng-content> ya existe como vista del consumidor en cuanto
 * este componente se instancia — `rendered` solo controla si esa vista está
 * insertada en el DOM. El efecto visual final es el mismo: nada queda
 * visible ni interactuable después de la salida.
 */
@Component({
  selector: 'cs-motion',
  standalone: true,
  templateUrl: './motion.html',
  styleUrl: './motion.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class Motion implements OnChanges, OnDestroy {
  @Input() show = false;
  @Input() preset: MotionPreset = 'fade';
  @Input() enterDuration: MotionDurationToken = 'entering';
  @Input() exitDuration: MotionDurationToken = 'leaving';
  @Input() enterEasing: MotionEasingToken = 'enter';
  @Input() exitEasing: MotionEasingToken = 'exit';
  @Input() innerClass = '';

  @ViewChild('wrap') private wrapRef?: ElementRef<HTMLElement>;

  protected readonly rendered = signal(false);

  private tween?: gsap.core.Tween;
  private enterTimeout?: ReturnType<typeof setTimeout>;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['show']) return;
    if (this.show) this.enter();
    else this.exit();
  }

  ngOnDestroy(): void {
    if (this.enterTimeout) clearTimeout(this.enterTimeout);
    this.tween?.kill();
  }

  private enter(): void {
    if (this.enterTimeout) clearTimeout(this.enterTimeout);
    this.tween?.kill();
    this.rendered.set(true);
    // Un tick después: el @if recién insertó #wrap en el DOM, hace falta
    // esperar a que ViewChild lo resuelva antes de animarlo (mismo patrón
    // que Modal usa para su transición de entrada).
    this.enterTimeout = setTimeout(() => {
      const el = this.wrapRef?.nativeElement;
      if (!el) return;
      const { hidden, visible } = PRESETS[this.preset];
      gsap.set(el, hidden);
      this.tween = gsap.to(el, {
        ...visible,
        duration: tokenSeconds(el, `--motion-duration-${this.enterDuration}`, DURATION_MS[this.enterDuration]),
        ease: EASES[this.enterEasing],
      });
    });
  }

  private exit(): void {
    if (this.enterTimeout) clearTimeout(this.enterTimeout);
    const el = this.wrapRef?.nativeElement;
    if (!el || !this.rendered()) {
      this.rendered.set(false);
      return;
    }
    this.tween?.kill();
    const { hidden } = PRESETS[this.preset];
    this.tween = gsap.to(el, {
      ...hidden,
      duration: tokenSeconds(el, `--motion-duration-${this.exitDuration}`, DURATION_MS[this.exitDuration]),
      ease: EASES[this.exitEasing],
      onComplete: () => this.rendered.set(false),
    });
  }
}
