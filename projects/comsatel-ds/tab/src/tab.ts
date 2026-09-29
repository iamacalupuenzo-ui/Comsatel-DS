import { Component, Input, signal } from '@angular/core';

/**
 * Panel individual — solo tiene sentido dentro de un `<cs-tabs>`, que lee
 * `value`/`label`/`disabled` vía `contentChildren()` para dibujar la fila
 * de botones, y setea `active` directo (mismo mecanismo que
 * Accordion/AccordionItem, ver comentario en tabs.ts).
 */
@Component({
  selector: 'cs-tab',
  template: '<div class="cs-tab-panel" role="tabpanel" tabindex="0" [attr.id]="panelId()" [attr.aria-labelledby]="tabId()" [hidden]="!active()"><ng-content></ng-content></div>',
  styleUrl: './tab.css',
})
export class Tab {
  @Input({ required: true }) value!: string;
  @Input({ required: true }) label!: string;
  @Input() disabled = false;

  readonly active = signal(false);
  readonly tabId = signal('');
  readonly panelId = signal('');
}
