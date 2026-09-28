import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Icon } from '../icons/icon';

/** Acción de limpieza para un cs-input-group, directa o dentro de un addon. */
@Component({
  selector: 'cs-input-group-clear',
  imports: [Icon],
  template: `<button type="button" class="clear" [attr.aria-label]="label" [disabled]="disabled" (click)="clear()"><cs-icon name="x" [size]="16" aria-hidden="true" /></button>`,
  styles: [
    `:host { display: contents; }
    .clear { display: grid; place-items: center; flex: none; width: var(--layout-size-sm); height: var(--layout-size-sm); margin-inline-end: var(--layout-padding-2xs); padding: 0; border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--color-icon-neutral-subtle); cursor: pointer; }
    .clear:hover { background: var(--color-background-neutral-subtle); }
    .clear:focus-visible { outline: var(--layout-border-thick) solid var(--color-border-focused); outline-offset: var(--layout-padding-2xs); }
    .clear:disabled { opacity: var(--opacity-disabled); cursor: not-allowed; }`,
  ],
})
export class InputGroupClear {
  @Input() label = 'Limpiar campo';
  @Input() disabled = false;
  @Output() cleared = new EventEmitter<void>();

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  clear(): void {
    const input = this.element.nativeElement.closest('.cs-input-group')?.querySelector('input');
    if (!input || input.disabled || input.readOnly) return;
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
    this.cleared.emit();
  }
}
