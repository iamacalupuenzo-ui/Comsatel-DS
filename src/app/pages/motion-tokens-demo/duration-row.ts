import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { EASE_DEFAULT } from 'comsatel-ds';

/** Una fila del catálogo de --motion-duration-*: mueve un bloque a duración
 * variable, siempre con --motion-easing-default — así la fila aísla el
 * efecto de la duración sola, sin mezclarlo con una curva distinta. */
@Component({
  selector: 'app-duration-row',
  standalone: true,
  templateUrl: './duration-row.html',
  styleUrl: './duration-row.css',
})
export class DurationRow implements AfterViewInit {
  @Input({ required: true }) token!: string;
  @Input({ required: true }) ms!: number;
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
    gsap.fromTo(el, { x: 0 }, { x: 88, duration: this.ms / 1000, ease: EASE_DEFAULT, overwrite: true });
  }
}
