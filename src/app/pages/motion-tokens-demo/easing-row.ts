import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { tokenSeconds } from 'comsatel-ds';

/** Una fila del catálogo de --motion-easing-*: mueve un bloque siempre a
 * --motion-duration-slow, variando solo la curva — así se aísla el efecto
 * de la curva de aceleración sola, sin mezclarlo con una duración distinta. */
@Component({
  selector: 'app-easing-row',
  standalone: true,
  templateUrl: './easing-row.html',
  styleUrl: './easing-row.css',
})
export class EasingRow implements AfterViewInit {
  @Input({ required: true }) token!: string;
  @Input({ required: true }) curve!: string;
  @Input({ required: true }) ease!: gsap.EaseFunction;
  @Input({ required: true }) description!: string;

  @ViewChild('dot') private dotRef?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.play();
  }

  protected replay(): void {
    this.play();
  }

  private play(): void {
    const el = this.dotRef?.nativeElement;
    if (!el) return;
    gsap.fromTo(
      el,
      { x: 0 },
      { x: 88, duration: tokenSeconds(el, '--motion-duration-slow', 350), ease: this.ease, overwrite: true },
    );
  }
}
