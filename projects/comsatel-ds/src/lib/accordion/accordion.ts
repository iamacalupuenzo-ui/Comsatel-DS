import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { AccordionItem } from './accordion-item';

export type AccordionType = 'single' | 'multiple';

/**
 * Orquesta la exclusión mutua entre `<cs-accordion-item>` proyectados. No
 * usa inyección de dependencias para coordinar con los hijos (un
 * `<cs-accordion-item>` está declarado en el template del CONSUMIDOR, no
 * en el de este componente — que un hijo intente `inject(Accordion)` ahí
 * es terreno ambiguo de la resolución de DI de Angular para contenido
 * proyectado). En cambio: `@ContentChildren` para leer las instancias
 * reales de los hijos y setear su signal `expanded` directo, y una
 * suscripción manual a su `toggled` para enterarse de los clicks — ambos
 * mecanismos funcionan sin importar cómo Angular resuelva la inyección.
 */
@Component({
  selector: 'cs-accordion',
  template: '<ng-content></ng-content>',
  styleUrl: './accordion.css',
})
export class Accordion implements AfterContentInit, OnChanges, OnDestroy {
  /** "single" (por defecto): abrir un ítem cierra el resto. "multiple":
   * cualquier cantidad abierta a la vez, sin exclusión. */
  @Input() type: AccordionType = 'single';
  @Input() defaultExpandedIds: string[] = [];
  /** Si se pasa junto con expandedIdsChange, el estado lo maneja quien
   * consume — igual que React. */
  @Input() expandedIds?: string[];
  @Output() readonly expandedIdsChange = new EventEmitter<string[]>();

  @ContentChildren(AccordionItem) private itemsQuery!: QueryList<AccordionItem>;

  private internalIds: string[] = [];
  private itemSubs: { unsubscribe(): void }[] = [];
  private queryChangesSub?: { unsubscribe(): void };

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.expandedIds === undefined && this.internalIds.length === 0) {
      this.internalIds = this.defaultExpandedIds;
    }
    this.sync();
  }

  ngAfterContentInit(): void {
    if (this.expandedIds === undefined) this.internalIds = this.defaultExpandedIds;
    this.wireItems();
    this.queryChangesSub = this.itemsQuery.changes.subscribe(() => this.wireItems());
  }

  ngOnDestroy(): void {
    this.itemSubs.forEach((s) => s.unsubscribe());
    this.queryChangesSub?.unsubscribe();
  }

  private get currentIds(): string[] {
    return this.expandedIds ?? this.internalIds;
  }

  private wireItems(): void {
    this.itemSubs.forEach((s) => s.unsubscribe());
    this.itemSubs = this.itemsQuery.map((item) => item.toggled.subscribe(() => this.toggle(item.id)));
    this.sync();
  }

  private sync(): void {
    if (!this.itemsQuery) return;
    const ids = this.currentIds;
    this.itemsQuery.forEach((item) => item.expanded.set(ids.includes(item.id)));
  }

  private toggle(id: string): void {
    const ids = this.currentIds;
    const isOpen = ids.includes(id);
    let next: string[];
    if (this.type === 'single') next = isOpen ? [] : [id];
    else next = isOpen ? ids.filter((x) => x !== id) : [...ids, id];
    if (this.expandedIds === undefined) this.internalIds = next;
    this.expandedIdsChange.emit(next);
    this.sync();
  }
}
