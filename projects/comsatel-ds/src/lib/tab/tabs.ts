import { AfterContentInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, contentChildren, signal } from '@angular/core';
import { PressScale } from '../directives/press-scale.directive';
import { Tab } from './tab';

export type TabsVariant = 'line' | 'pill';

let tabsInstance = 0;

/**
 * Dibuja la fila de botones a partir de los `<cs-tab>` proyectados —
 * `contentChildren()` (query basada en signals) en vez de
 * `@ContentChildren`/`QueryList`: acá, a diferencia de Accordion, el
 * propio template del padre necesita re-renderizar la fila de botones a
 * partir de la lista y de cuál está activo — para que eso reaccione en una
 * app zoneless, la lista y el valor activo tienen que ser signals de
 * verdad, no una `QueryList` leída una vez.
 */
@Component({
  selector: 'cs-tabs',
  imports: [PressScale],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs implements AfterContentInit, OnChanges {
  @Input() variant: TabsVariant = 'line';
  @Input() value?: string;
  @Input() defaultValue?: string;
  @Output() readonly valueChange = new EventEmitter<string>();

  protected readonly items = contentChildren(Tab);
  protected readonly active = signal<string | undefined>(undefined);
  private readonly instanceId = `cs-tabs-${++tabsInstance}`;

  ngAfterContentInit(): void {
    this.assignIds();
    this.setActive(this.value ?? this.defaultValue ?? this.items()[0]?.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value !== undefined) this.setActive(this.value);
  }

  protected select(tab: Tab): void {
    if (tab.disabled) return;
    this.setActive(tab.value);
    this.valueChange.emit(tab.value);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const key = event.key;
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(key)) return;
    event.preventDefault();
    const enabled = this.items().filter((item) => !item.disabled);
    if (!enabled.length) return;
    const current = enabled.indexOf(this.items()[index]);
    const nextIndex = key === 'Home'
      ? 0
      : key === 'End'
        ? enabled.length - 1
        : (current + (key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length;
    const next = enabled[nextIndex];
    this.select(next);
    document.getElementById(next.tabId())?.focus();
  }

  private setActive(value: string | undefined): void {
    this.active.set(value);
    for (const item of this.items()) item.active.set(item.value === value);
  }

  private assignIds(): void {
    for (const item of this.items()) {
      const suffix = item.value.replace(/[^a-zA-Z0-9_-]/g, '-');
      item.tabId.set(`${this.instanceId}-tab-${suffix}`);
      item.panelId.set(`${this.instanceId}-panel-${suffix}`);
    }
  }
}
