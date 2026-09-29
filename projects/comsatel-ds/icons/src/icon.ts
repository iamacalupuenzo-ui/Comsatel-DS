import { Component, Input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { ICON_REGISTRY, type IconName } from './icon-registry';

@Component({
  selector: 'cs-icon',
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      [innerHTML]="markup"
    ></svg>
  `,
  styles: [':host { display: inline-flex; line-height: 0; }'],
})
export class Icon {
  @Input({ required: true }) name!: IconName;
  @Input() size = 16;

  constructor(private sanitizer: DomSanitizer) {}

  protected get markup(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ICON_REGISTRY[this.name] ?? '');
  }
}
