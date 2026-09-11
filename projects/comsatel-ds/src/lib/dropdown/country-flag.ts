import { Component, Input } from '@angular/core';
import type { CountryFlagCode } from './dropdown-types';

/** Bandera decorativa: la opción mantiene siempre un nombre textual. */
@Component({
  selector: 'cs-country-flag',
  template: '<span aria-hidden="true" [class]="\'cs-country-flag cs-country-flag--\' + country" [style.width.px]="size" [style.height.px]="height"></span>',
  styleUrl: './country-flag.css',
})
export class CountryFlag {
  @Input() country: CountryFlagCode = 'fr';
  @Input() size = 16;

  get height(): number { return Math.round(this.size * 0.75); }
}
