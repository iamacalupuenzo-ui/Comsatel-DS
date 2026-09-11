import { Component } from '@angular/core';
import type { gsap } from 'gsap';
import { EASE_DEFAULT, EASE_ENTER, EASE_EXIT, EASE_SPRING } from 'comsatel-ds';
import { DurationRow } from './duration-row';
import { EasingRow } from './easing-row';

interface DurationEntry {
  token: string;
  ms: number;
  description: string;
}

interface EasingEntry {
  token: string;
  curve: string;
  ease: gsap.EaseFunction;
  description: string;
}

const DURATIONS: DurationEntry[] = [
  {
    token: '--motion-duration-fast',
    ms: 100,
    description:
      'Feedback de hover y foco, rotación de chevron, cambios de estado chicos. Todo lo que se repite seguido necesita sentirse instantáneo.',
  },
  {
    token: '--motion-duration-leaving',
    ms: 150,
    description:
      'Animaciones de salida: un flyout que se cierra, un toast que desaparece. Salir es más rápido que entrar — tiene que quitarse de en medio.',
  },
  {
    token: '--motion-duration-medium',
    ms: 200,
    description: 'Por defecto para la mayoría de las transiciones de UI: menús dropdown, tooltips, secciones que colapsan.',
  },
  {
    token: '--motion-duration-entering',
    ms: 250,
    description:
      'Animaciones de entrada: un flyout que se abre, un panel que se expande. Un poco más lenta que salir, para que el contenido nuevo se lea como que llega, no que aparece de golpe.',
  },
  {
    token: '--motion-duration-slow',
    ms: 350,
    description: 'Superficies más grandes moviéndose a su lugar: un side nav colapsando a rail, un modal apareciendo.',
  },
];

const EASINGS: EasingEntry[] = [
  {
    token: '--motion-easing-default',
    curve: 'cubic-bezier(0.2, 0, 0, 1)',
    ease: EASE_DEFAULT,
    description: 'La curva de propósito general: arranca rápido, se asienta suave. Úsala salvo que la transición necesite específicamente una de las otras tres.',
  },
  {
    token: '--motion-easing-enter',
    curve: 'cubic-bezier(0, 0, 0.2, 1)',
    ease: EASE_ENTER,
    description: 'Va con animaciones de entrada: arranca lento, acelera, y se asienta suave — se empareja con motion-duration-entering.',
  },
  {
    token: '--motion-easing-exit',
    curve: 'cubic-bezier(0.2, 0, 1, 0.9)',
    ease: EASE_EXIT,
    description: 'Va con animaciones de salida: sale rápido y se mantiene rápida — se empareja con motion-duration-leaving.',
  },
  {
    token: '--motion-easing-spring',
    curve: 'cubic-bezier(0.15, 1.15, 0.6, 1)',
    ease: EASE_SPRING,
    description: 'Se pasa un poco de su destino antes de asentarse. Reservada para momentos juguetones que buscan atención — un badge que aterriza, un estado de éxito — no para transiciones cotidianas.',
  },
];

@Component({
  selector: 'app-motion-tokens-page',
  imports: [DurationRow, EasingRow],
  templateUrl: './motion-tokens-page.html',
  styleUrl: './motion-tokens-page.css',
})
export class MotionTokensPage {
  protected readonly durations = DURATIONS;
  protected readonly easings = EASINGS;
}
