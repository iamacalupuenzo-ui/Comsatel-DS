import { Component, ElementRef, Input } from '@angular/core';

export type InputGroupAddonAlign = 'inline-start' | 'inline-end';

// Puerto 1:1 de InputGroupAddon. Al hacer clic en el addon (fuera de un
// botón interno), enfoca el input del grupo — mismo comportamiento que
// clickear el "label" visual de un campo.
@Component({
  selector: 'cs-input-group-addon',
  templateUrl: './input-group-addon.html',
  styleUrl: './input-group-addon.css',
})
export class InputGroupAddon {
  @Input() align: InputGroupAddonAlign = 'inline-start';

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  onClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button')) return;
    this.elementRef.nativeElement.parentElement?.querySelector('input')?.focus();
  }
}
